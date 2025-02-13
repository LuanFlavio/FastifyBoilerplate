import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserDTO } from '../../../shared/schemas/userSchema'
import { CreateUserUseCase } from '../../../application/user/useCases/CreateUserUseCase'
import { IUser } from '../../../shared/dtos/user.dto'
import { GetUserUseCase } from '../../../application/user/useCases/GetUserUseCase'
import { GetByIdUserUseCase } from '../../../application/user/useCases/GetByIdUserUseCase'

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private getByIdUserUseCase: GetByIdUserUseCase
  ) {
    this.get = this.get.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
  }

  async get(
    req: FastifyRequest<{ Body: CreateUserDTO }>,
    rep: FastifyReply
  ): Promise<IUser[] | null> {
    const users = await this.getUserUseCase.execute()

    return rep.status(200).send(users)
  }

  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    rep: FastifyReply
  ): Promise<IUser | null> {
    return await this.getByIdUserUseCase.execute(req.params.id)
  }

  async create(
    req: FastifyRequest<{ Body: CreateUserDTO }>,
    rep: FastifyReply
  ): Promise<IUser | null> {
    const user = req.body

    const newUser = await this.createUserUseCase.execute(user)

    return rep.status(201).send(newUser)
  }
}
