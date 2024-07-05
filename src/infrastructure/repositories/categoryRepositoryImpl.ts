// MongoCategoryRepository.ts
import { CategoryEntity } from "../../domain/entities/category";
import { CategoryRepository } from "../../domain/repositories/categoryRepository";
import { Category } from "../database/models/category"; // Assuming this is the Mongoose model

export class CategoryRepositoryImpl implements CategoryRepository {
  async addCategory(name: string,description: string,image: string): Promise<CategoryEntity | null> {

      const alreadyExist = await Category.findOne({name:{$regex:new RegExp(`^${name}$`,'i')}})
      if(alreadyExist){
        throw new Error('Category already exist try defferent category')
      }

        const category = new Category({ name, description, image });
        await category.save();
        return new CategoryEntity(
          category.id,
          category.name,
          category.description,
          category.image,
          category.isBlocked
        );
  }
  async getAllCategories(page: number, limit: number): Promise<{ categories: CategoryEntity[]; totalCategories: number } | null> {
    try {
      const skip = (page - 1) * limit;
      const categories = await Category.find({ isBlocked: false }).skip(skip).limit(limit).exec();
      const totalCategories = await Category.countDocuments();
  
      const categoryEntities = categories.map(
        (category) =>
          new CategoryEntity(
            category._id.toString(),
            category.name,
            category.description,
            category.image,
            category.isBlocked
          )
      );
  
      return {
        categories: categoryEntities,
        totalCategories,
      };
    } catch (error) {
      console.error("Error retrieving categories:", error);
      return null;
    }
  }
  async updateCategory({
    _id,
    name,
    description,
    image,
  }: {
    _id: string;
    name?: string;
    description?: string;
    image?: string;
  }): Promise<CategoryEntity | null> {
    const data: Partial<CategoryEntity> = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (image) data.image = image;

    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      { $set: data },
      { new: true }
    ).exec();
    
    return updatedCategory;
  }
  async blockCategory(categoryId: string): Promise<CategoryEntity | null> {
    try {
        const blockedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { $set: { isBlocked: true } },
            { new: true }  
        ).exec();
        return blockedCategory;
    } catch (error) {
        console.error("Error blocking the category:", error);
        return null;
    }
  }
 
}
