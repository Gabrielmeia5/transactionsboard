import { FastifyInstance } from "fastify";
import { TransactionUseCase } from "../usecases/transaction.usecase";
import { Transaction, TransactionCreate } from "../interface/transactions.interface";
import { authMiddleware } from "../middlewares/auth.middleware";


export function transactionsRoutes(fastify: FastifyInstance) {
    const transactionUseCase = new TransactionUseCase()
    fastify.addHook("preHandler", authMiddleware)
    fastify.post<{Body: TransactionCreate }>("/", async (req, reply) => {
        const {amount, type, description } = req.body
        const { emailUser } = req.headers['email']
        try {
            const data = await transactionUseCase.create({
                amount,
                type,
                description,
                userEmail: emailUser
            })
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.get('/', async (req, reply) => {
        const emailUser = req.headers['email']
        try {
            const data = await transactionUseCase.listAllTransactions(emailUser)
            return data
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.put<{Body: Transaction, Params: { id: string } }>('/:id', async (req, reply) => {
        const {id} = req.params
        const {amount, description, type} = req.body
        try {
            const data = await transactionUseCase.updateTransaction({
                id,
                amount,
                description,
                type
            })
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })
}   