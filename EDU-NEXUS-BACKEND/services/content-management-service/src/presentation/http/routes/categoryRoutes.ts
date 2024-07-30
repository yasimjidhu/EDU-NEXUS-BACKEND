import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { CategoryUseCase } from "../../../application/usecases/categoryUseCase";
import { categoryRepositoryImpl } from "../../../infrastructure/repositories/categoryRepositoryImpl";
import authMiddleware, { adminMiddleware } from "../middlewares/authentcationMiddleware";

const router = Router();

// Repository
const categoryRepository = new categoryRepositoryImpl();

// Use Case
const categoryUseCase = new CategoryUseCase(categoryRepository);

// Controller
const categoryController = new CategoryController(categoryUseCase);

// Routes
router.post('/', authMiddleware,adminMiddleware,categoryController.handleAddCategory.bind(categoryController));
router.put('/:categoryId', authMiddleware,adminMiddleware, categoryController.updateCategory.bind(categoryController));
router.post('/block/:categoryId', authMiddleware,adminMiddleware, categoryController.blockCategory.bind(categoryController));
router.get('/', categoryController.getAllCategories.bind(categoryController));

export default router;
