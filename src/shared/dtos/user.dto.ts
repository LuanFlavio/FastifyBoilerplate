export interface CreateUserDto {
  name: string
  email: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
}

export interface IUser {
  id: string
  nome: string
  email: string
}
