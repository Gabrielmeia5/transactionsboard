import { TransactionCreate, TransactionRepository } from "../interface/transactions.interface";
import { UserRepository } from "../interface/user.interface";
import { TransactionRepositoryPrisma } from "../repositories/transactions.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class TransactionUseCase {
    private transactionRepository: TransactionRepository;
    private userRepository: UserRepository;
    constructor() {
        this.transactionRepository = new TransactionRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({amount, description, type, userEmail}:TransactionCreate) {
        // Email do Usario conectado
        // Buscar Usuario pelo email
        // se nao existir, erro
        // se existir, criar transacao
        
        const user = await this.userRepository.findByEmail(userEmail)

        if (!user) {
            throw new Error("User not found")
        }

        const transaction = await this.transactionRepository.create({
            amount,
            type,
            description,
            userId: user.id
        })
        return transaction
    }
}

export { TransactionUseCase }