import z from 'zod'
import { randomUUID } from 'node:crypto'
import { IUser } from '../../../shared/dtos/user.dto'
import { FastifyCustomInstance } from '../types/server'

const users: IUser[] = []

export async function userRoute(fastify: FastifyCustomInstance) {
  fastify.get(
    '/',
    {
      schema: {
        description: 'List users',
        summary: 'List',
        tags: ['Usuarios'],
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
    '/',
    {
      schema: {
        description: 'Create a new user',
        summary: 'Create',
        tags: ['Usuarios'],
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
