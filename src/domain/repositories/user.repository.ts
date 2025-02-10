import { User } from '../entities/user.entity'

export interface UserRepository {
  findById(userId: string): Promise<User>
  save(user: User): Promise<void>
}
