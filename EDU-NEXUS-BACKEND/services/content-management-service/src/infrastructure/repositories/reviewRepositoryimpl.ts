// MongoCategoryRepository.ts
import { ReviewEntity } from "../../domain/entities/review";
import { ReviewRepository } from "../../domain/repositories/reviewRepository";
import { Review } from "../database/models/reviews"; 

export class ReviewRepositoryImpl implements ReviewRepository{

    async addReview(data: ReviewEntity): Promise<ReviewEntity | null> {
        try {
            const newReview = new Review(data);
            const savedReview = await newReview.save();
            return savedReview.toObject() as ReviewEntity;
        } catch (error) {
            console.error('Error posting review:', error);
            return null
        }
    }
    async getReviews(courseId:string): Promise<ReviewEntity[] | []> {
        try {
           
            const userReviews = await Review.find({ courseId }).lean().exec();
            const transformedReviews: ReviewEntity[] = userReviews.map(review => ({
                _id: review._id?.toString(),
                userId: review.userId.toString(),
                courseId: review.courseId.toString(),
                rating: review.rating,
                content: review.content,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt
            }));
            return transformedReviews
        } catch (error) {
            console.error('Error getting reviews:', error);
            return []
        }
    }
    
}
