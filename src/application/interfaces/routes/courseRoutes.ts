import { Router } from "express"
import { CategoryController } from "../controllers/CategoryController"
import { CategoryUseCase } from "../../usecases/categoryUseCase"
import {  categoryRepositoryImpl } from "../../../infrastructure/repositories/categoryRepositoryImpl"
import { CourseController } from "../controllers/courseController"
import { CourseUseCase } from "../../usecases/courseUseCase"
import CourseRepositoryImpl from "../../../infrastructure/repositories/courseRepositoryImpl"
import { EnrollmentRepositoryImpl } from "../../../infrastructure/repositories/enrollmentRepositoryImpl"
import { EnrollmentUseCase } from "../../usecases/enrollmentUseCase"
import { EnrollmentController } from "../controllers/EnrollmentController"
import { ReviewRepositoryImpl } from "../../../infrastructure/repositories/reviewRepositoryimpl"
import { ReviewUseCase } from "../../usecases/reviewUseCase"
import { ReviewController } from "../controllers/reviewController"

const router = Router() 

// repositories
const cateogyRepository = new categoryRepositoryImpl()
const courseRepository = new CourseRepositoryImpl()
const enrollmentRepository = new EnrollmentRepositoryImpl()
const reviewRepository = new ReviewRepositoryImpl()

// usecases
const cateogyUsecase = new CategoryUseCase(cateogyRepository)
const courseUseCase = new CourseUseCase(courseRepository)
const enrollmentUseCase = new EnrollmentUseCase(enrollmentRepository)
const reviewUseCase = new ReviewUseCase(reviewRepository)

//controller
const categoryController = new CategoryController(cateogyUsecase)
const courseController = new CourseController(courseUseCase)
const enrollmentController = new EnrollmentController(enrollmentUseCase)
const reviewController = new ReviewController(reviewUseCase)

//routes
router.post('/add-category',categoryController.handleAddCategory.bind(categoryController))
router.put('/update-category',categoryController.updateCategory.bind(categoryController))
router.post('/block-category/:categoryId',categoryController.blockCategory.bind(categoryController))
router.get('/get-all-categories',categoryController.getAllCategories.bind(categoryController))
router.post('/add-course',courseController.addCourse.bind(courseController))
router.put('/update-course',courseController.updateCourse.bind(courseController))
router.get('/get-courses/:instructorId',courseController.getAllCoursesOfInstructor.bind(courseController))
router.get('/get-course/:id',courseController.getCourse.bind(courseController))
router.get('/get-all-courses',courseController.getAllCourses.bind(courseController))
router.post('/review',reviewController.addReview.bind(reviewController))
router.get('/review/:courseId',reviewController.getReviews.bind(reviewController))
router.get('/courseRequsts',courseController.getUnpublishedCourses.bind(courseController))
router.post('/enrollment',enrollmentController.enrollment.bind(enrollmentController))
router.get('/enrollment/check',enrollmentController.checkEnrollment.bind(enrollmentController))
router.put('/enrollment/progress',enrollmentController.updateLessonProgress.bind(enrollmentController))
router.get('/my-course/:userId',enrollmentController.getStudentEnrolledCourses.bind(enrollmentController))


export default router