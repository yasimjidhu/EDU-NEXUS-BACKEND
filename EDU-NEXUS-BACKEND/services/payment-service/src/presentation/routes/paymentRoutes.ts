import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
import { PaymentUseCase } from "../../application/usecases/paymentUseCase";
import { PaymentRepository } from "../../infrastructure/database/repositories/paymentRepository";
import { StripePaymentService } from "../../infrastructure/services/StripePaymentService";
import { handleStripeWebhook } from "../../infrastructure/webhooks/stripeWebHooks";

const router = Router()

const paymentRepository = new PaymentRepository()
const paymentService = new StripePaymentService()
const paymentUseCase = new PaymentUseCase(paymentRepository,paymentService)
const paymentController = new PaymentController(paymentUseCase)


router.post('/create',paymentController.createPaymentIntent.bind(paymentController))
router.post('/confirm',paymentController.confirmPayment.bind(paymentController));
router.get('payments/:userId',paymentController.getUserPayments.bind(paymentController));
router.post('/stripe-webhook', express.raw({type: 'application/json'}), handleStripeWebhook);

export default router