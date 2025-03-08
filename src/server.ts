import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { transactionsRoutes } from "./routes/transaction.routes"

const app: FastifyInstance = fastify({logger: true})

app.register(userRoutes, {
    prefix: "/users",
})

app.register(transactionsRoutes, {
    prefix: "/transactions",
})



app.listen({
    port: 3000}, () => {
        console.log("Server is Running in: http://localhost:3000")
    })