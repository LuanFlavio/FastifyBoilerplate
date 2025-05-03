import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
})

export const ResponseUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
})

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

export type CreateUserDTO = z.infer<typeof CreateUserSchema>
export type LoginUserDTO = z.infer<typeof LoginUserSchema>
