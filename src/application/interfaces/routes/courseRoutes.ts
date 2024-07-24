import { Router } from "express";
import { CourseController } from "../controllers/courseController";
import { CourseUseCase } from "../../usecases/courseUseCase";
import CourseRepositoryImpl from "../../../infrastructure/repositories/courseRepositoryImpl";
import authMiddleware, { instructorMiddleware } from "../../../infrastructure/middlewares/authentcationMiddleware";


const router = Router();

// Repository
const courseRepository = new CourseRepositoryImpl();

// Use Case
const courseUseCase = new CourseUseCase(courseRepository);

// Controller
const courseController = new CourseController(courseUseCase);

// Routes
router.get('/', courseController.getAllCourses.bind(courseController));
router.get('/get-course/:id', courseController.getCourse.bind(courseController));
router.put('/reject/:courseId',courseController.rejectCourse.bind(courseController));
router.put('/approve/:courseId',courseController.approveCourse.bind(courseController));
router.get('/courseRequests',courseController.getUnpublishedCourses.bind(courseController));
router.get('/categorywise/:categoryId', courseController.getCategoryWiseCourses.bind(courseController));
router.get('/get-courses/:instructorId', courseController.getAllCoursesOfInstructor.bind(courseController));
router.post('/add-course',authMiddleware,instructorMiddleware, courseController.addCourse.bind(courseController));
router.put('/update-course',authMiddleware,instructorMiddleware, courseController.updateCourse.bind(courseController));

export default router;
