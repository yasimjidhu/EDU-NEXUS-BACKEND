// MongoCategoryRepository.ts
import { CategoryEntity } from "../../domain/entities/category";
import { CategoryRepository } from "../../domain/repositories/categoryRepository";
import { Category } from "../database/models/category"; // Assuming this is the Mongoose model

export class categoryRepositoryImpl implements CategoryRepository {
    async addCategory(name: string, description: string, image: string): Promise<CategoryEntity | null> {
        try {
            const category = new Category({ name, description, image });
            await category.save();
            return new CategoryEntity(category.id,category.name, category.description, category.image);
        } catch (error) {
            console.error('Error saving category:', error);
            return null;
        }
    }
    async getAllCategories(): Promise<CategoryEntity[] | null> {
        try {
            const categories = await Category.find();
            return categories.map(category => new CategoryEntity(category.id,category.name, category.description, category.image));
        } catch (error) {
            console.error('Error retrieving categories:', error);
            return null;
        }
    }
}
