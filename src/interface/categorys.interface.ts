
export interface Category {
    id:    string,
    name:  string,
    userId?: string,
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
    deleteCategory(id: string): Promise<boolean>;
}