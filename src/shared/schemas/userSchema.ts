import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})

export const ResponseUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
})

export type CreateUserDTO = z.infer<typeof CreateUserSchema>
