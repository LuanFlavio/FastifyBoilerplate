import { UserRepositoryTest } from '../../../domain/repositories/user.repositoryTest'
import { PrismaUserRepository } from '../../../infra/database/prisma/user.repository.prisma'
import { IUser } from '../../../shared/dtos/user.dto'
import { LoginUserDTO } from '../../../shared/schemas/userSchema'

export class GetByCredencialsUserUseCase {
  private userRepository: PrismaUserRepository

  constructor(private userRepositoryTest: UserRepositoryTest) {
    this.userRepository = new PrismaUserRepository()
  }

  async execute(credencials: LoginUserDTO): Promise<IUser | null> {
    return await this.userRepositoryTest.findByCredentials(credencials)
  }
}
