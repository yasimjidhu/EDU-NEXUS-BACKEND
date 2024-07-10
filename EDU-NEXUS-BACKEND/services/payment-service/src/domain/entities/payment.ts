export class PaymentEntity {
    id?: string;
    userId: string;
    courseId:string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed';
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      userId: string,
      courseId: string,
      amount: number,
      currency: string,
      status: 'pending' | 'completed' | 'failed',
      createdAt: Date,
      updatedAt: Date,
      id?: string
    ) {
      this.id = id;
      this.userId = userId;
      this.courseId = courseId;
      this.amount = amount;
      this.currency = currency;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  