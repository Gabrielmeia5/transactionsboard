import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/auth.middleware";
import { CategoryUseCase } from "../usecases/category.usecase";
import { Category, CategoryCreate } from "../interface/categorys.interface";


export function categoriesRoutes(fastify: FastifyInstance) {
    const categoryUseCase = new CategoryUseCase()
    fastify.addHook("preHandler", authMiddleware)
    fastify.post<{Body: CategoryCreate }>("/", async (req, reply) => {
        const { name } = req.body
        const emailUser = req.headers['email']
        try {
            const data = await categoryUseCase.createCategory({
                name,
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
            const data = await categoryUseCase.listAllCategories(emailUser)
            return data
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.put<{Body: Category, Params: { id: string } }>('/:id', async (req, reply) => {
        const {id} = req.params
        const { name } = req.body
        try {
            const data = await categoryUseCase.updateCategory({
                id,
                name
            })
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.delete<{Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params
        try {
            const data = await categoryUseCase.delete(id)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })
}