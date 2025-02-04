import z from 'zod'
import { FastifyCustomInstance } from './types/server'
import { randomUUID } from 'node:crypto'

interface IUser {
  id: string
  nome: string
  email: string
}

const users: IUser[] = []

export async function routes(fastify: FastifyCustomInstance) {
  fastify.get(
    '/',
    {
      schema: {
        description: 'List users',
        summary: 'List',
        tags: ['Users'],
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              nome: z.string(),
              email: z.string(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      return users
    }
  )

  fastify.post(
    '/user',
    {
      schema: {
        description: 'Create a new user',
        summary: 'Create',
        tags: ['Users'],
        body: z.object({
          nome: z.string().min(3),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            nome: z.string(),
            email: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { nome, email } = request.body

      const newUser = users.push({
        id: randomUUID(),
        nome,
        email,
      })

      return reply.status(201).send(users[newUser - 1])
    }
  )
}
