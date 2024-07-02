import { ReviewEntity } from "../entities/review";

    export interface ReviewRepository{
        addReview(data:ReviewEntity):Promise<ReviewEntity | null>;
}