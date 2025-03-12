import { Decimal } from "@prisma/client/runtime/library";


export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
    id: string,
    userId: string,
    amount: Decimal,
    description: string | null,
    type: string,
    categoryId: string | null
}

export interface TransactionCreate {
    userEmail: string,
    amount: Decimal,
    description: string | null,
    type: TransactionType,
    categoryId: string | null
}

export interface TransactionCreateData {
    userId: string,
    amount: Decimal,
    description: string | null,
    type: TransactionType,
    categoryId: string | null
}

export interface TransactionRepository {
    create(data: TransactionCreateData): Promise<Transaction>;
    findAllTransactions(userId: string): Promise<Transaction[]>;
    updateTransaction({ id, amount, description, type }: Transaction): Promise<Transaction>;
    delete(id: string): Promise<boolean>;
}