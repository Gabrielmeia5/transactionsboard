
import { Category, CategoryCreate, CategoryRepository } from "../interface/categorys.interface";
import { UserRepository } from "../interface/user.interface";
import { CategoryRepositoryPrisma } from "../repositories/categorys.repository";

import { UserRepositoryPrisma } from "../repositories/user.repository";

class CategoryUseCase {
    private categoryRepository: CategoryRepository;
    private userRepository: UserRepository;
    constructor() {
        this.categoryRepository = new CategoryRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async createCategory({ name, userEmail }: CategoryCreate) {

        const user = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error("User not found");
        }

        const category = await this.categoryRepository.createCategory({
            name,
            userId: user.id
        });

        return category;
    }


    async listAllCategories(userEmail: string) {
        const user = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error("User not found");
        }

        const categories = await this.categoryRepository.findAllCategories(user.id);
        return categories;
    }



    async updateCategory({id, name, userId}:Category) {
        const user = await this.userRepository.findByEmail(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const category = await this.categoryRepository.findIfCategoryByUser(id, user.id);

        if(!category) {
            throw new Error("Category does not belong to the user or not found");
        }

        const data = await this.categoryRepository.updateCategory({
            id,
            name,
            userId: user.id
        })
        return data
    }

    async delete(id: string, emailUser: string) {
        const user = await this.userRepository.findByEmail(emailUser);
        if (!user) {
            throw new Error("User not found");
        }

        const category = await this.categoryRepository.findIfCategoryByUser(id, user.id);

        if(!category) {
            throw new Error("Category does not belong to the user or not found");
        }

        const data = await this.categoryRepository.deleteCategory(id)
        return data
    }
}

export { CategoryUseCase } 