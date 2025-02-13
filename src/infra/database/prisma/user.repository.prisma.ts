import { User } from '../../../domain/entities/user.entity'
import { UserRepository } from '../../../domain/repositories/user.repository'
import { IUser } from '../../../shared/dtos/user.dto'

export class PrismaUserRepository implements UserRepository {
  findMany(): Promise<IUser[] | null> {
    throw new Error('Method not implemented.')
  }

  async findById(userId: string): Promise<IUser | null> {
    throw new Error('Method not implemented.')
    /*return await this.prisma.user.findUnique({
      where: { id: userId },
    })*/
  }

  async save(user: User): Promise<IUser | null> {
    throw new Error('Method not implemented.')
    /*return await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })*/
  }
}
