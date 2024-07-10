import { PaymentEntity } from "../../domain/entities/payment";
import { PaymentRepository } from "../../infrastructure/database/repositories/paymentRepository";
import { IPaymentService } from '../interfaces/IPaymentService';

export class PaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private paymentService: IPaymentService
  ) {}

  async createPaymentIntent(userId: string,courseId:string, amount: number, currency: string): Promise<{ clientSecret: string }> {
    const { clientSecret } = await this.paymentService.createPaymentIntent(userId,courseId, amount, currency);
    
    const payment = new PaymentEntity(
      userId,
      courseId,
      amount,
      currency,
      'pending',
      new Date(),
      new Date()
    );

    await this.paymentRepository.create(payment);
    return { clientSecret };
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
