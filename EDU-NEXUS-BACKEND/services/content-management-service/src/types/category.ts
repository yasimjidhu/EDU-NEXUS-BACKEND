import { CategoryEntity } from "../domain/entities/category";

export interface PaginatedCategories {
    categories: CategoryEntity[];
    totalCategories: number;
}