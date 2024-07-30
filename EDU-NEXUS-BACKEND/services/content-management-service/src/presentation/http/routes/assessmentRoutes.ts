import { Router } from "express";
import { AssessmentController } from "../controllers/assessmentController";
import { AssessmentUseCase } from "../../../application/usecases/assessmentUseCase";
import { AssessmentRepositoryImpl } from "../../../infrastructure/repositories/assessmentRepositoryImpl";
import authMiddleware, { instructorMiddleware } from "../middlewares/authentcationMiddleware";

const router = Router();

// Repository
const assessmentRepository = new AssessmentRepositoryImpl();

// Use Case
const assessmentUseCase = new AssessmentUseCase(assessmentRepository);

// Controller
const assessmentController = new AssessmentController(assessmentUseCase);

// Routes
router.post('/assessment',authMiddleware,instructorMiddleware, assessmentController.addAssessment.bind(assessmentController));
router.get('/assessment/:instructorId', assessmentController.getAssessments.bind(assessmentController));
router.get('/assessment/:assessmentId', assessmentController.getAssessment.bind(assessmentController));
router.put('/assessment',authMiddleware,instructorMiddleware, assessmentController.updateAssessment.bind(assessmentController));

export default router;
