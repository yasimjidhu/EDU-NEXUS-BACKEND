import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import { ReviewUseCase } from "../../../application/usecases/reviewUseCase";
import { ReviewRepositoryImpl } from "../../../infrastructure/repositories/reviewRepositoryimpl";
import authMiddleware, { studentMiddleware } from "../middlewares/authentcationMiddleware";


const router = Router();

// Repository
const reviewRepository = new ReviewRepositoryImpl();

// Use Case
const reviewUseCase = new ReviewUseCase(reviewRepository);

// Controller
const reviewController = new ReviewController(reviewUseCase);

// Routes
router.post('/review',authMiddleware,studentMiddleware, reviewController.addReview.bind(reviewController));
router.get('/review/:courseId', reviewController.getReviews.bind(reviewController));

export default router;
