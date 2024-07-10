import { Request, Response } from 'express';
import { PaymentUseCase } from '../../application/usecases/paymentUseCase';

export class PaymentController {
  constructor(private paymentUseCase: PaymentUseCase) {}

  async createPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      console.log('payment request reached in payment',req.body)
      const { userId,courseId, amount, currency } = req.body;
      const result = await this.paymentUseCase.createPaymentIntent(userId,courseId, amount, currency);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async confirmPayment(req: Request, res: Response): Promise<void> {
    try {
      const { paymentIntentId } = req.body;
      await this.paymentUseCase.confirmPayment(paymentIntentId);
      res.status(200).json({ message: 'Payment confirmed successfully' });
    } catch (error) {
      console.error('Error confirming payment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserPayments(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const payments = await this.paymentUseCase.getUserPayments(userId);
      res.status(200).json(payments);
    } catch (error) {
      console.error('Error fetching user payments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}