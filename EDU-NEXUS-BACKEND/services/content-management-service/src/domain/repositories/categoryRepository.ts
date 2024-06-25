import { CategoryEntity } from "../entities/category";

export interface CategoryRepository{
    addCategory(name:string,description:string,image:string):Promise<CategoryEntity | null>
    getAllCategories():Promise<CategoryEntity[] | null>
}