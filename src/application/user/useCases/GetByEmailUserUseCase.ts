import { UserRepositoryTest } from '../../../domain/repositories/user.repositoryTest'
import { PrismaUserRepository } from '../../../infra/database/prisma/user.repository.prisma'
import { IUser } from '../../../shared/dtos/user.dto'

export class GetByEmailUserUseCase {
  private userRepository: PrismaUserRepository

  constructor(private userRepositoryTest: UserRepositoryTest) {
    this.userRepository = new PrismaUserRepository()
  }

  async execute(email: string): Promise<IUser | null> {
    return await this.userRepositoryTest.findByEmail(email)
  }
}
