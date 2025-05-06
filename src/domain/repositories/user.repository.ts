import { IUser } from '../../shared/dtos/user.dto'
import { User } from '../entities/user.entity'

export interface UserRepository {
  findMany(): Promise<IUser[] | null>
  findById(userId: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
  save(user: User): Promise<IUser | null>
}
