import { CreateUserDTO, LoginUserDTO } from '../../../shared/schemas/userSchema'
import { CreateUserUseCase } from '../../../application/user/useCases/CreateUserUseCase'
import { IUser } from '../../../shared/dtos/user.dto'
import { GetByCredencialsUserUseCase } from '../../../application/user/useCases/GetByCredencialsUserUseCase'
import { GetByEmailUserUseCase } from '../../../application/user/useCases/GetByEmailUserUseCase'
import { JwtUtils } from '../utils/jwt.utils'

export class AuthController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getByCredencialsUserUseCase: GetByCredencialsUserUseCase,
    private getByEmailUserUseCase: GetByEmailUserUseCase
  ) {
    this.google = this.google.bind(this)
    this.local = this.local.bind(this)
    this.jwt = this.jwt.bind(this)
  }

  async google(user: CreateUserDTO): Promise<IUser | null> {
    const searchUser = await this.getByEmailUserUseCase.execute(user.email)

    let newUser = null

    searchUser || (newUser = await this.createUserUseCase.execute(user))

    return searchUser || newUser
  }

  async local(
    user: LoginUserDTO
  ): Promise<{ user: IUser; token: string } | null> {
    const result = await this.getByCredencialsUserUseCase.execute(user)

    if (!result) return null

    const token = JwtUtils.generateToken({ id: result.id, email: result.email })

    return { user: result, token }
  }

  async jwt(email: string): Promise<Omit<IUser, 'password'> | null> {
    const result = await this.getByEmailUserUseCase.execute(email)

    if (!result) return null

    const protectedUser = {
      id: result.id,
      name: result.name,
      email: result.email,
    }

    return protectedUser
  }
}
