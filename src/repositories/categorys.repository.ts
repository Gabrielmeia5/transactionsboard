import { prisma } from "../database/prisma.client";
import { Category, CategoryCreateData, CategoryRepository } from "../interface/categorys.interface";

export class CategoryRepositoryPrisma implements CategoryRepository {
    async createCategory(data: CategoryCreateData): Promise<Category> {
        const result = await prisma.category.create({
            data: {
                name: data.name,
                userId: data.userId
            }
        });
        return result;
    }

    async findAllCategories(userId: string): Promise<Category[]> {
        console.log(`Buscando categorias para userId: ${userId}`);
        
        const result = await prisma.category.findMany({
            where: {
                userId
            }
        });

        console.log(`Categorias encontradas: ${JSON.stringify(result)}`);
        return result;
    }

    async updateCategory({ id, name }: Category): Promise<Category> {
        const result = await prisma.category.update({
            where: {
                id
            },
            data: {
                id,
                name
            }
        });
        return result;
    }

    async deleteCategory(id: string): Promise<boolean> {
        const result = await prisma.category.delete({
            where: {
                id
            }
        });
        return result ? true : false;
    }
}