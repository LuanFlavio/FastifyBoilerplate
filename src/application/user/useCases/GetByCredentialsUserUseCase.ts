import { UserRepositoryTest } from '../../../domain/mock/user.repository.mock'
import { PrismaUserRepository } from '../../../infra/database/prisma/user.repository.prisma'
import { IUser } from '../../../shared/dtos/user.dto'
import { LoginUserDTO } from '../../../shared/schemas/userSchema'

export class GetByCredentialsUserUseCase {
  private userRepository: PrismaUserRepository

  constructor(private userRepositoryTest: UserRepositoryTest) {
    this.userRepository = new PrismaUserRepository()
  }

  async execute(credentials: LoginUserDTO): Promise<IUser | null> {
    return await this.userRepositoryTest.findByCredentials(credentials)
  }
}
