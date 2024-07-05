import { Router } from "express";
import { CourseController } from "../controllers/courseController";
import { CourseUseCase } from "../../usecases/courseUseCase";
import CourseRepositoryImpl from "../../../infrastructure/repositories/courseRepositoryImpl";

const router = Router();

// Repository
const courseRepository = new CourseRepositoryImpl();

// Use Case
const courseUseCase = new CourseUseCase(courseRepository);

// Controller
const courseController = new CourseController(courseUseCase);

// Routes
router.post('/add-course', courseController.addCourse.bind(courseController));
router.put('/update-course', courseController.updateCourse.bind(courseController));
router.get('/get-courses/:instructorId', courseController.getAllCoursesOfInstructor.bind(courseController));
router.get('/categorywise/:categoryId', courseController.getCategoryWiseCourses.bind(courseController));
router.get('/get-course/:id', courseController.getCourse.bind(courseController));
router.get('/courses', courseController.getAllCourses.bind(courseController));
router.get('/courseRequests', courseController.getUnpublishedCourses.bind(courseController));

export default router;
