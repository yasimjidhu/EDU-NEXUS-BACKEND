
export interface ReviewEntity {
    userId: string;
    courseId: string;
    rating?: number;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
}