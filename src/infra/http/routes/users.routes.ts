import z from 'zod'
import { FastifyCustomInstance } from '../types/server'
import {
  CreateUserSchema,
  ResponseUserSchema,
} from '../../../shared/schemas/userSchema'
import { UserController } from '../controllers/user.controller'
import { CreateUserUseCase } from '../../../application/user/useCases/CreateUserUseCase'
import { GetUserUseCase } from '../../../application/user/useCases/GetUserUseCase'
import { GetByIdUserUseCase } from '../../../application/user/useCases/GetByIdUserUseCase'
import { UserRepositoryTest } from '../../../domain/repositories/user.repositoryTest'

export async function userRoute(fastify: FastifyCustomInstance) {
  const userRepositoryTest = new UserRepositoryTest()

  const createUserUseCase = new CreateUserUseCase(userRepositoryTest)
  const getUserUseCase = new GetUserUseCase(userRepositoryTest)
  const getByIdUserUseCase = new GetByIdUserUseCase(userRepositoryTest)

  const userController = new UserController(
    createUserUseCase,
    getUserUseCase,
    getByIdUserUseCase
  )

  fastify.get(
    '/',
    {
      schema: {
        description: 'List users',
        summary: 'List',
        tags: ['Usuarios'],
        response: {
          200: z.array(ResponseUserSchema).nullable(),
        },
      },
    },
    userController.get
  )

  fastify.get(
    '/:id',
    {
      schema: {
        description: 'Users filtered by id',
        summary: 'User by id',
        tags: ['Usuarios'],
        response: {
          200: ResponseUserSchema.nullable(),
        },
      },
    },
    userController.getById
  )

  fastify.post(
    '/',
    {
      schema: {
        description: 'Create a new user',
        summary: 'Create',
        tags: ['Usuarios'],
        body: CreateUserSchema,
        response: { 200: ResponseUserSchema.nullable() },
      },
    },
    userController.create
  )
}
