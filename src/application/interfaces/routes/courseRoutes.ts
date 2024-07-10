// import { Router } from "express"
// import { CategoryController } from "../controllers/CategoryController"
// import { CategoryUseCase } from "../../usecases/categoryUseCase"
// import {  categoryRepositoryImpl } from "../../../infrastructure/repositories/categoryRepositoryImpl"
// import { CourseController } from "../controllers/courseController"
// import { CourseUseCase } from "../../usecases/courseUseCase"
// import CourseRepositoryImpl from "../../../infrastructure/repositories/courseRepositoryImpl"


// // repositories
// const cateogyRepository = new categoryRepositoryImpl()
// const courseRepository = new CourseRepositoryImpl()

// const router = Router() 

// // usecases
// const cateogyUsecase = new CategoryUseCase(cateogyRepository)
// const courseUseCase = new CourseUseCase(courseRepository)

// //controller
// const categoryController = new CategoryController(cateogyUsecase)
// const courseController = new CourseController(courseUseCase)

// router.post('/add-category',categoryController.handleAddCategory.bind(categoryController))
// router.put('/update-category',categoryController.updateCategory.bind(categoryController))
// router.post('/block-category/:categoryId',categoryController.blockCategory.bind(categoryController))
// router.get('/get-all-categories',categoryController.getAllCategories.bind(categoryController))
// router.post('/add-course',courseController.addCourse.bind(courseController))
// router.get('/get-courses/:instructorId',courseController.getAllCoursesOfInstructor.bind(courseController))
// router.get('/get-course/:id',courseController.getCourse.bind(courseController))
// router.get('/get-all-courses',courseController.getAllCourses.bind(courseController))
// router.get('/courseRequsts',courseController.getUnpublishedCourses.bind(courseController))


// export default router

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
