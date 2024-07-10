import pool from '../paymentDb';
import { PaymentEntity } from '../../../domain/entities/payment';
import { IPaymentRepository } from '../../../application/interfaces/IPaymentRepository';

export class PaymentRepository implements IPaymentRepository {


  async create(payment: PaymentEntity): Promise<PaymentEntity> {
    const query = `
      INSERT INTO payments (id, user_id, amount, currency, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [payment.id, payment.userId, payment.amount, payment.currency, payment.status, payment.createdAt, payment.updatedAt];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async findById(id: string): Promise<Payment | null> {
    const query = 'SELECT * FROM payments WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async findByUserId(userId: string): Promise<Payment[]> {
    const query = 'SELECT * FROM payments WHERE user_id = $1';
    const result = await this.pool.query(query, [userId]);
    return result.rows;
  }

  async update(payment: Payment): Promise<Payment> {
    const query = `
      UPDATE payments
      SET status = $1, updated_at = $2
      WHERE id = $3
      RETURNING *
    `;
    const values = [payment.status, payment.updatedAt, payment.id];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }
}