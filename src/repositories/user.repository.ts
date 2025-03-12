import { prisma } from "../database/prisma.client";
import { User, UserCreate, UserRepository } from "../interface/user.interface";

class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        const result = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
        return result
    }
    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findFirst({
            where: {
                email
            }
        })
        return result || null
    }

    async findById(id: string): Promise<User | null> {
        const result = await prisma.user.findFirst({
            where: {
                id
            }
        })
        return result || null
    }
}

export { UserRepositoryPrisma }