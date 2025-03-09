
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
        console.log(`Criando categoria: ${name} para o usuário: ${userEmail}`);
        // Encontre o usuário pelo email
        const user = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error("User not found");
        }
        console.log(`User encontrado: ${JSON.stringify(user)}`);
        // Crie a categoria com o userId correto
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



    async updateCategory({id, name}:Category) {
        const data = await this.categoryRepository.updateCategory({
            id,
            name
        })
        return data
    }

    async delete(id: string) {
        const data = await this.categoryRepository.deleteCategory(id)
        return data
    }
}

export { CategoryUseCase } 