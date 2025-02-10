import { User } from '../../../domain/entities/user.entity'
import { UserRepository } from '../../../domain/repositories/user.repository'

export class PrismaUserRepository implements UserRepository {
  async findById(userId: string): Promise<User> {
    return await prisma.user.findUnique({
      where: { id: userId },
    })
  }

  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  }
}
