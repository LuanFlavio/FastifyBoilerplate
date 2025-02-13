import { CreateUserDTO } from '../../shared/schemas/userSchema'
import { randomUUID } from 'node:crypto'

export class User {
  id: string
  name: string
  email: string

  constructor(user: CreateUserDTO) {
    this.id = randomUUID()
    this.name = user.name
    this.email = user.email
  }

  update(data: UpdateUserDto): void {
    if (data.name) {
      this.name = data.name
    }
    if (data.email) {
      this.email = data.email
    }
  }
}

export interface UpdateUserDto {
  name?: string
  email?: string
}
