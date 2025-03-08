import { Decimal } from "@prisma/client/runtime/library";

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
    userId: string,
    amount: Decimal,
    type: string,
}

export interface TransactionCreate {
    userEmail: string,
    amount: Decimal,
    type: TransactionType,
}

export interface TransactionCreateData {
    userId: string,
    amount: Decimal,
    type: TransactionType,
}

export interface TransactionRepository {
    create(data: TransactionCreateData): Promise<Transaction>;
}