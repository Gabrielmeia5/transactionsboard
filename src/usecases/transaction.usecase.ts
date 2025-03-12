import { Transaction, TransactionCreate, TransactionRepository } from "../interface/transactions.interface";
import { UserRepository } from "../interface/user.interface";
import { CategoryRepository } from "../interface/categorys.interface";
import { TransactionRepositoryPrisma } from "../repositories/transactions.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { CategoryRepositoryPrisma } from "../repositories/categorys.repository";

class TransactionUseCase {
    private transactionRepository: TransactionRepository;
    private userRepository: UserRepository;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.transactionRepository = new TransactionRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
        this.categoryRepository = new CategoryRepositoryPrisma();
    }

    async create({ amount, description, type, userEmail, categoryId }: TransactionCreate) {
        const user = await this.userRepository.findByEmail(userEmail);

        if (!user) {
            throw new Error("User not found");
        }

        // Verifique se a categoria pertence ao usuário
        if(categoryId) {
            const category = await this.categoryRepository.findByIdAndUserId(categoryId, user.id);
            if (!category) {
            throw new Error("Category does not belong to the user");
            }
        }

        const transaction = await this.transactionRepository.create({
            amount,
            type,
            description,
            userId: user.id,
            categoryId
        });
        return transaction;
    }

    async listAllTransactions(userEmail: string) {
        const user = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error("User not found");
        }
        const transactions = await this.transactionRepository.findAllTransactions(user.id);
        return transactions;
    }

    async updateTransaction({ id, userId, amount, description, type, categoryId }: Transaction) {
        const user = await this.userRepository.findByEmail(userId);
        if (!user) {
            throw new Error("User not found");
        }


        if (categoryId) {
            const category = await this.categoryRepository.findByIdAndUserId(categoryId, user.id);
            if (!category) {
                throw new Error("Category does not belong to the user");
            }
        }

        // Trate os valores para garantir que não sejam undefined
        const data = await this.transactionRepository.updateTransaction({
            id,
            userId: user.id,
            amount: amount ?? 0, // Use um valor padrão se amount for undefined
            description: description ?? '', // Use uma string vazia se description for undefined
            type: type ?? '', // Use uma string vazia se type for undefined
            categoryId: categoryId ?? '' // Use uma string vazia se categoryId for undefined
        });
        return data;
    }

    async delete(id: string) {
        const data = await this.transactionRepository.delete(id);
        return data;
    }
}

export { TransactionUseCase };