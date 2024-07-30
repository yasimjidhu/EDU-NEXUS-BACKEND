import { ReviewEntity } from "../entities/review";

    export interface ReviewRepository{
        addReview(data:ReviewEntity):Promise<ReviewEntity | null>;
        getReviews(courseId:string):Promise<ReviewEntity[] | []>
}