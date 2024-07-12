
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
            const page = parseInt(req.query.page as string)|| 1
            const limit = 6

        try {
        
            const result = await this.categoryUseCase.getAllCategories(page,limit);
            if(result){
                const { categories, totalCategories } = result;
                res.status(200).json({categories,totalCategories})
            }else{
                res.status(500).json({ error: 'Failed to retrieve categories' });
            }
        } catch (error: any) {
            console.error('Error in CategoryController:', error);
            res.status(500).json({ message: error.message });
        }
    }
    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const updatedCategory = await this.categoryUseCase.updateCategory(req.body);
            res.status(200).json({ message: 'Category updated successfully', updatedCategory });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    async blockCategory(req: Request, res: Response): Promise<void> {
        try {
            const categoryId = req.params.categoryId as string
            const response = await this.categoryUseCase.blockCategory(categoryId);
            res.status(200).json({ message: 'Category deleted successfully',success:true,categories:response });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    
}
