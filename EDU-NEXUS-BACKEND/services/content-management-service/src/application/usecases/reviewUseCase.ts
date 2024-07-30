import { ReviewEntity } from "../../domain/entities/review";
import { ReviewRepository } from "../../domain/repositories/reviewRepository";

export class ReviewUseCase{
    constructor(private readonly reviewRepository:ReviewRepository){}

    async addReview(data: ReviewEntity): Promise<ReviewEntity | null> {
        try {
            const addedReview = await this.reviewRepository.addReview(data);
            return addedReview;
        } catch (error:any) {
            throw new Error(`Failed to add review  to the course: ${error.message}`);
        }
    }
    async getUserReviews(courseId:string): Promise<ReviewEntity[] |[]> {
        try {
            const userReviews = await this.reviewRepository.getReviews(courseId);
            return userReviews;
        } catch (error:any) {
            throw new Error(`Failed to retrieve reviews : ${error.message}`);
        }
    }
}