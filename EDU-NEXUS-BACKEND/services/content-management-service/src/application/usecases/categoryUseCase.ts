// CategoryUseCase.ts
import { CategoryEntity } from "../../domain/entities/category";
import { CategoryRepository } from "../../domain/repositories/categoryRepository"; // Ensure correct path

export class CategoryUseCase {  
    constructor(private categoryRepository: CategoryRepository) {}

    async addCategory(data: { name: string; description: string; image: string }): Promise<CategoryEntity | null> {
        return await this.categoryRepository.addCategory(data.name, data.description, data.image);
    }
    async getAllCategories():Promise<CategoryEntity[] | null>{
        return await this.categoryRepository.getAllCategories()
    }
}
