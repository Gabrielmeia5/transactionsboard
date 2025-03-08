import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interface/user.interface";

export function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase()
    fastify.post<{Body: UserCreate }>("/", async (req, reply) => {
        const {name, email, password} = req.body
        try {
            const data = await userUseCase.create({
                name,
                email,
                password
            })
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })
    fastify.get("/", async (req, reply) => {
        reply.send({ hello: 'word'})
    })
}