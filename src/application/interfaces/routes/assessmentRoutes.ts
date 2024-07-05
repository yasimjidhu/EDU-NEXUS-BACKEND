import { Router } from "express";
import { AssessmentController } from "../controllers/assessmentController";
import { AssessmentUseCase } from "../../usecases/assessmentUseCase";
import { AssessmentRepositoryImpl } from "../../../infrastructure/repositories/assessmentRepositoryImpl";

const router = Router();

// Repository
const assessmentRepository = new AssessmentRepositoryImpl();

// Use Case
const assessmentUseCase = new AssessmentUseCase(assessmentRepository);

// Controller
const assessmentController = new AssessmentController(assessmentUseCase);

// Routes
router.post('/assessment', assessmentController.addAssessment.bind(assessmentController));
router.get('/assessment/:instructorId', assessmentController.getAssessments.bind(assessmentController));
router.get('/assessment/:assessmentId', assessmentController.getAssessment.bind(assessmentController));
router.put('/assessment', assessmentController.updateAssessment.bind(assessmentController));

export default router;
