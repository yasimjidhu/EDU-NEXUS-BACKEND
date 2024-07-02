// MongoCategoryRepository.ts
import { ReviewEntity } from "../../domain/entities/review";
import { ReviewRepository } from "../../domain/repositories/reviewRepository";
import { Review } from "../database/models/reviews"; 

export class reviewRepositoryImpl implements ReviewRepository{

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
    
}
