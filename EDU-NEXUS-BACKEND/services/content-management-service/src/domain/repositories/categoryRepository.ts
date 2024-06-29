import { CategoryEntity } from "../entities/category";

export interface CategoryRepository{
    addCategory(name:string,description:string,image:string):Promise<CategoryEntity | null>
    getAllCategories():Promise<CategoryEntity[] | null>
    updateCategory({_id, name, description, image}: { _id: string, name?: string, description?: string, image?: string }): Promise<CategoryEntity | null>;
    blockCategory(categoryId:string):Promise<CategoryEntity | null>
}