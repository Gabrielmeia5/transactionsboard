import { TransactionType } from "@prisma/client";
import { prisma } from "../database/prisma.client";
import { Transaction, TransactionCreate, TransactionCreateData, TransactionRepository } from "../interface/transactions.interface";

export class TransactionRepositoryPrisma implements TransactionRepository {
    async create(data: TransactionCreateData): Promise<Transaction> {
        const result = await prisma.transaction.create({
            data: {
                amount: data.amount,
                type: data.type,
                description: data.description,
                userId: data.userId
            }
        })
        return result
    }
    async findAllTransactions(userId: string): Promise<Transaction[]> {
        const result = await prisma.transaction.findMany({
            where: {
                userId
            }
        })
        return result
    }
    async updateTransaction({ id, amount, description, type }: Transaction): Promise<Transaction> {
        const result = await prisma.transaction.update({
            where: {
                id
            },
            data: {
                amount,
                description,
                type: type as TransactionType,
            }
        })
        return result
    }

    async delete(id: string): Promise<boolean> {
        const result = await prisma.transaction.delete({
            where: {
                id
            }
        })
        return result ? true : false
    }
}