import { IUser } from '../../shared/dtos/user.dto'
import { User } from '../entities/user.entity'
import { UserRepository } from './user.repository'

export class UserRepositoryTest implements UserRepository {
  public users: IUser[] = []

  async findMany(): Promise<IUser[] | null> {
    return this.users
  }

  async findById(userId: string): Promise<IUser | null> {
    const user = this.users.find(u => u.id === userId)

    return user || null
  }

  async save(user: User): Promise<IUser | null> {
    this.users.push(user)

    const newUser = this.users.find(u => u.id === user.id)

    return newUser || null
  }
}
