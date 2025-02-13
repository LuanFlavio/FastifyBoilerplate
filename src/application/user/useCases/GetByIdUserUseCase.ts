import { UserRepositoryTest } from '../../../domain/repositories/user.repositoryTest'
import { PrismaUserRepository } from '../../../infra/database/prisma/user.repository.prisma'
import { IUser } from '../../../shared/dtos/user.dto'

export class GetByIdUserUseCase {
  private userRepository: PrismaUserRepository

  constructor(private userRepositoryTest: UserRepositoryTest) {
    this.userRepository = new PrismaUserRepository()
  }

  async execute(id: string): Promise<IUser | null> {
    return await this.userRepositoryTest.findById(id)
  }
}
