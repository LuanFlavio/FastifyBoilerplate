import { IUser } from '../../shared/dtos/user.dto'
import { LoginUserDTO } from '../../shared/schemas/userSchema'
import { User } from '../entities/user.entity'
import { UserRepository } from './user.repository'

export class UserRepositoryTest implements UserRepository {
  public users: IUser[] = [
    {
      id: '55cf1010-e751-4eb4-afc0-5054fffca773',
      name: 'string',
      email: 'user@example.com',
      password: 'string',
    },
  ]

  async findMany(): Promise<IUser[] | null> {
    return this.users
  }

  async findById(userId: string): Promise<IUser | null> {
    const user = this.users.find(u => u.id === userId)

    return user || null
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find(u => u.email === email)

    return user || null
  }

  async findByCredentials(credentials: LoginUserDTO): Promise<IUser | null> {
    const user = this.users.find(
      u => u.email === credentials.email && u.password === credentials.password
    )

    return user || null
  }

  async save(user: User): Promise<IUser | null> {
    this.users.push(user)

    const newUser = this.users.find(u => u.id === user.id)

    return newUser || null
  }
}
