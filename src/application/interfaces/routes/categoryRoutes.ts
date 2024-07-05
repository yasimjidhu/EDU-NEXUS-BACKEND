import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { CategoryUseCase } from "../../usecases/categoryUseCase";
import { CategoryRepositoryImpl } from "../../../infrastructure/repositories/categoryRepositoryImpl";

const router = Router();

// Repository
const categoryRepository = new CategoryRepositoryImpl();

// Use Case
const categoryUseCase = new CategoryUseCase(categoryRepository);

// Controller
const categoryController = new CategoryController(categoryUseCase);

// Routes
router.post('/add-category', categoryController.handleAddCategory.bind(categoryController));
router.put('/update-category', categoryController.updateCategory.bind(categoryController));
router.post('/block/:categoryId', categoryController.blockCategory.bind(categoryController));
router.get('/categories', categoryController.getAllCategories.bind(categoryController));

export default router;
