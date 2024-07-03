import { Request, Response } from "express";
import { ReviewUseCase } from "../../usecases/reviewUseCase";

export class ReviewController{
    constructor(private reviewUseCase: ReviewUseCase) {}

    async addReview(req:Request,res:Response):Promise<void>{
        try{
            const addedReview = await this.reviewUseCase.addReview(req.body)
            res.status(200).json({ message: "review added successfully  ", addedReview });
        }catch(error:any){
            console.log(error.message)
            res.status(500).json({ message: error.message });   
        }
    }
    async getReviews(req:Request,res:Response):Promise<void>{
        try{
            const { courseId } = req.params;
            const userReviews = await this.reviewUseCase.getUserReviews(courseId)
            res.status(200).json({ message: "review retrieved successfully  ", reviews:userReviews });
        }catch(error:any){
            console.log(error.message)
            res.status(500).json({ message: error.message });   
        }
    }
}