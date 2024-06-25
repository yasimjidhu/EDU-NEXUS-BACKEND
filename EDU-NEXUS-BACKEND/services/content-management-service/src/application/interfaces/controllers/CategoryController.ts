
import { Request, Response } from "express";
import { CategoryUseCase } from "../../usecases/categoryUseCase";

export class CategoryController {
    constructor(private categoryUseCase: CategoryUseCase) {}

    async handleAddCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await this.categoryUseCase.addCategory(req.body);
            if (!category) {
                res.status(500).json({ message: 'Error occurred while adding the category' });
                return;
            }
            res.status(200).json({ message: 'Category added successfully', category });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.categoryUseCase.getAllCategories();
            if (categories) {
                res.status(200).json(categories);
            } else {
                res.status(404).json({ message: 'No categories found' });
            }
        } catch (error: any) {
            console.error('Error in CategoryController:', error);
            res.status(500).json({ message: error.message });
        }
    }
}
