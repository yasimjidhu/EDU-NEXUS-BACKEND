// CategoryUseCase.ts
import { CategoryEntity } from "../../domain/entities/category";
import { CategoryRepository } from "../../domain/repositories/categoryRepository"; // Ensure correct path
import { PaginatedCategories } from "../../types/category";

export class CategoryUseCase {  
    constructor(private categoryRepository: CategoryRepository) {}

    async addCategory(data: { name: string; description: string; image: string }): Promise<CategoryEntity | null> {
        return await this.categoryRepository.addCategory(data.name, data.description, data.image);
    }
    async getAllCategories(page:number,limit:number):Promise<PaginatedCategories| null>{
        return await this.categoryRepository.getAllCategories(page,limit)
    }
    async updateCategory({_id, name, description, image}: { _id: string, name?: string, description?: string, image?: string }): Promise<CategoryEntity | null> {
        return await this.categoryRepository.updateCategory( {_id, name, description, image });
    }
    async blockCategory(categoryId:string):Promise<CategoryEntity | null>{
        return await this.categoryRepository.blockCategory(categoryId)
    }
    
}
