
import { Transaction, TransactionCreate, TransactionRepository } from "../interface/transactions.interface";
import { UserRepository } from "../interface/user.interface";
import { TransactionRepositoryPrisma } from "../repositories/transactions.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class TransactionUseCase {
    private transactionRepository: TransactionRepository;
    private userRepository: UserRepository;
    constructor() {
        this.transactionRepository = new TransactionRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({amount, description, type, userEmail, categoryId}:TransactionCreate) {
        
        const user = await this.userRepository.findByEmail(userEmail)

        if (!user) {
            throw new Error("User not found")
        }

        const transaction = await this.transactionRepository.create({
            amount,
            type,
            description,
            userId: user.id,
            categoryId
        })
        return transaction
    }

    async listAllTransactions(userEmail: string) {
        const user = await this.userRepository.findByEmail(userEmail)
        if (!user) {
            throw new Error("User not found")
        }
        const transactions = await this.transactionRepository.findAllTransactions(user.id)
        return transactions
    }

    async updateTransaction({id, amount, description, type, categoryId}:Transaction) {
        const data = await this.transactionRepository.updateTransaction({
            id,
            amount,
            description,
            type,
            categoryId
        })
        
       
        return data

    }

    async delete(id: string) {
        const data = await this.transactionRepository.delete(id)
        return data
    }
}

export { TransactionUseCase }