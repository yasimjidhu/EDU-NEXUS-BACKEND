import { Router } from "express"
import { CategoryController } from "../controllers/CategoryController"
import { CategoryUseCase } from "../../usecases/categoryUseCase"
import {  categoryRepositoryImpl } from "../../../infrastructure/repositories/categoryRepositoryImpl"
import { CourseController } from "../controllers/courseController"
import { CourseUseCase } from "../../usecases/courseUseCase"
import CourseRepositoryImpl from "../../../infrastructure/repositories/courseRepositoryImpl"


// repositories
const cateogyRepository = new categoryRepositoryImpl()
const courseRepository = new CourseRepositoryImpl()

const router = Router() 

// usecases
const cateogyUsecase = new CategoryUseCase(cateogyRepository)
const courseUseCase = new CourseUseCase(courseRepository)

//controller
const categoryController = new CategoryController(cateogyUsecase)
const courseController = new CourseController(courseUseCase)

router.post('/add-category',categoryController.handleAddCategory.bind(categoryController))
router.get('/get-all-categories',categoryController.getAllCategories.bind(categoryController))
router.post('/add-course',courseController.addCourse.bind(courseController))
router.get('/get-all-courses',courseController.getAllCourses.bind(courseController))
router.get('/get-course',courseController.getCourse.bind(courseController))
    

export default router