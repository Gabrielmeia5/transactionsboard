import { FastifyInstance } from "fastify";
import { TransactionUseCase } from "../usecases/transaction.usecase";
import { TransactionCreate } from "../interface/transactions.interface";
import { authMiddleware } from "../middlewares/auth.middleware";


export function transactionsRoutes(fastify: FastifyInstance) {
    const transactionUseCase = new TransactionUseCase()
    fastify.addHook("preHandler", authMiddleware)
    fastify.post<{Body: TransactionCreate }>("/", async (req, reply) => {
        const {amount, type } = req.body
        const { emailUser } = req.headers['email']
        try {
            const data = await transactionUseCase.create({
                amount,
                type,
                userEmail: emailUser
            })
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })
}