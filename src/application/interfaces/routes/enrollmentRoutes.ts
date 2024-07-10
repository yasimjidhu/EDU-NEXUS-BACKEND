import { Router } from "express";
import { EnrollmentController } from "../controllers/EnrollmentController";
import { EnrollmentUseCase } from "../../usecases/enrollmentUseCase";
import { EnrollmentRepositoryImpl } from "../../../infrastructure/repositories/enrollmentRepositoryImpl";
import authMiddleware, { studentMiddleware } from "../../../infrastructure/middlewares/authentcationMiddleware";

const router = Router();

// Repository
const enrollmentRepository = new EnrollmentRepositoryImpl();

// Use Case
const enrollmentUseCase = new EnrollmentUseCase(enrollmentRepository);

// Controller
const enrollmentController = new EnrollmentController(enrollmentUseCase);

// Routes
router.post('/enrollment',authMiddleware,studentMiddleware, enrollmentController.enrollment.bind(enrollmentController));
router.get('/enrollment/check', enrollmentController.checkEnrollment.bind(enrollmentController));
router.put('/enrollment/progress', enrollmentController.updateLessonProgress.bind(enrollmentController));
router.get('/my-course/:userId', enrollmentController.getStudentEnrolledCourses.bind(enrollmentController));
router.post('/update-completion', enrollmentController.updateAssessmentCompletion.bind(enrollmentController));

export default router;
