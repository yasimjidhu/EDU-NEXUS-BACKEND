import { Router } from "express";
import { EnrollmentController } from "../controllers/EnrollmentController";
import { EnrollmentUseCase } from "../../../application/usecases/enrollmentUseCase";
import { EnrollmentRepositoryImpl } from "../../../infrastructure/repositories/enrollmentRepositoryImpl";
import { UserServiceClient } from "../../../infrastructure/grpc/userClient";
import authMiddleware, { studentMiddleware } from "../middlewares/authentcationMiddleware";

const router = Router();


//grpc client
const userServiceClient = new UserServiceClient('localhost:50052')

// Repository
const enrollmentRepository = new EnrollmentRepositoryImpl();

// Use Case
const enrollmentUseCase = new EnrollmentUseCase(enrollmentRepository,userServiceClient);

// Controller
const enrollmentController = new EnrollmentController(enrollmentUseCase);

// Routes
router.post('/',authMiddleware,studentMiddleware, enrollmentController.enrollment.bind(enrollmentController));
router.get('/check', enrollmentController.checkEnrollment.bind(enrollmentController));
router.put('/enrollment/progress', enrollmentController.updateLessonProgress.bind(enrollmentController));
router.get('/my-course/:userId', enrollmentController.getStudentEnrolledCourses.bind(enrollmentController));
router.post('/update-completion', enrollmentController.updateAssessmentCompletion.bind(enrollmentController));
router.get('/instructorRefs/:userId', enrollmentController.getEnrolledInstructorRefs.bind(enrollmentController));

export default router;
