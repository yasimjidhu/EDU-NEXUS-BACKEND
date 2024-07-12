import { PaymentEntity } from "../../domain/entities/payment";
import { PaymentRepository } from "../../infrastructure/database/repositories/paymentRepository";
import { IPaymentService } from '../interfaces/IPaymentService';
import Stripe from "stripe";

export class PaymentUseCase {
  private stripe:Stripe;
  constructor(
    private paymentRepository: PaymentRepository,
    private paymentService: IPaymentService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")
  }
  async createPaymentIntent( amount: number): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount,
      currency:'INR',
      automatic_payment_methods:{
        enabled:true
      }
    })
  }

  async confirmPayment(paymentIntentId: string): Promise<void> {
    await this.paymentService.confirmPayment(paymentIntentId);
    const payment = await this.paymentRepository.findById(paymentIntentId);
    if (payment) {
      payment.status = 'completed';
      payment.updatedAt = new Date();
      await this.paymentRepository.update(payment);
    }
  }

  async getUserPayments(userId: string): Promise<Payment[]> {
    return this.paymentRepository.findByUserId(userId);
  }
}
