import { UserRepositoryTest } from '../../../domain/repositories/user.repositoryTest'
import { PrismaUserRepository } from '../../../infra/database/prisma/user.repository.prisma'

export class GetUserUseCase {
  private userRepository: PrismaUserRepository

  constructor(private userRepositoryTest: UserRepositoryTest) {
    this.userRepository = new PrismaUserRepository()
  }

  async execute() {
    return this.userRepositoryTest.findMany()
  }
}
