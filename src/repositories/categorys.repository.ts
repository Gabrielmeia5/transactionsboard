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
        const result = await prisma.category.findMany({
            where: {
                userId
            }
        });
        return result;
    }

    async findByIdAndUserId(categoryId: string, userId: string): Promise<Category | null> {
        return prisma.category.findFirst({
            where: {
                id: categoryId,
                userId: userId
            }
        });
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

    async findIfCategoryByUser(id: string, userId: string): Promise<boolean> {
        const result = await prisma.category.findFirst({
            where: {
                id,
                userId
            }
        });
        return result ? true : false;
    }
    
}