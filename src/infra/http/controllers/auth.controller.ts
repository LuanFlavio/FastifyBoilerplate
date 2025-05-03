import { CreateUserDTO, LoginUserDTO } from '../../../shared/schemas/userSchema'
import { CreateUserUseCase } from '../../../application/user/useCases/CreateUserUseCase'
import { IUser } from '../../../shared/dtos/user.dto'
import { GetByCredencialsUserUseCase } from '../../../application/user/useCases/GetByCredencialsUserUseCase'
import { GetByEmailUserUseCase } from '../../../application/user/useCases/GetByEmailUserUseCase'

export class AuthController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getByCredencialsUserUseCase: GetByCredencialsUserUseCase,
    private getByEmailUserUseCase: GetByEmailUserUseCase
  ) {
    this.google = this.google.bind(this)
    this.local = this.local.bind(this)
  }

  async google(user: CreateUserDTO): Promise<IUser | null> {
    const searchUser = await this.getByEmailUserUseCase.execute(user.email)

    let newUser = null

    searchUser || (newUser = await this.createUserUseCase.execute(user))

    return searchUser || newUser
  }

  async local(user: LoginUserDTO): Promise<IUser | null> {
    const newUser = await this.getByCredencialsUserUseCase.execute(user)

    return newUser
  }
}
