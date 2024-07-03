
export interface ReviewEntity {
    _id?:string;
    userId: string;
    courseId: string;
    rating: number;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}