
export interface Category {
    id:    string,
    name:  string,
    userId: string,
}


export interface CategoryCreate {
    userEmail: string,
    name: string,
}

export interface CategoryCreateData {
    userId: string,
    name: string,
}

export interface CategoryRepository {
    createCategory(data: CategoryCreateData): Promise<Category>;
    findAllCategories(userId: string): Promise<Category[]>;
    updateCategory(data: Category): Promise<Category>;
    findByIdAndUserId(categoryId: string, userId: string): Promise<Category | null>;
    deleteCategory(id: string): Promise<boolean>;

    findIfCategoryByUser(id: string, userId: string): Promise<boolean>;
}