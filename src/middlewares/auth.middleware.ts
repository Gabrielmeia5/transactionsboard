export async function authMiddleware(req, reply) {
    const apiEmail = req.headers['email']

    if(!apiEmail) {
        reply.code(401).send({message: 'Email is required'})
    }
}