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
  name: string
  email: string
  password: string
}
