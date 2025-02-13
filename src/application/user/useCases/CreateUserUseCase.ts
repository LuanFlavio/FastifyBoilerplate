import { User } from '../../../domain/entities/user.entity'
import { UserRepositoryTest } from '../../../domain/repositories/user.repositoryTest'
import { PrismaUserRepository } from '../../../infra/database/prisma/user.repository.prisma'
import { IUser } from '../../../shared/dtos/user.dto'
import { CreateUserDTO } from '../../../shared/schemas/userSchema'

export class CreateUserUseCase {
  private userRepository: PrismaUserRepository

  constructor(private userRepositoryTest: UserRepositoryTest) {
    this.userRepository = new PrismaUserRepository()
  }

  async execute(user: CreateUserDTO): Promise<IUser | null> {
    const userToSave = new User(user)

    return await this.userRepositoryTest.save(userToSave)
  }
}
