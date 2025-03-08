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
}