import Stripe from 'stripe';
import { IPaymentService } from '../../application/interfaces/IPaymentService';

export class StripePaymentService implements IPaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(userId: string,courseId:string, amount: number, currency: string): Promise<{ clientSecret: string }> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { userId,courseId },
    });

    return { clientSecret: paymentIntent.client_secret! };
  }

  async confirmPayment(paymentIntentId: string): Promise<void> {
    await this.stripe.paymentIntents.confirm(paymentIntentId);
  }
}