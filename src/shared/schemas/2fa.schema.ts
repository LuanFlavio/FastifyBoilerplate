import { z } from 'zod'

export const Setup2FASchema = z.object({
  userId: z.string().uuid(),
})

export const Verify2FASchema = z.object({
  userId: z.string().uuid(),
  token: z.string().length(6).regex(/^\d+$/),
})

export const Setup2FAResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    secret: z.string(),
    qrCode: z.string(),
  }),
})

export const Verify2FAResponseSchema = z.object({
  success: z.boolean(),
  isValid: z.boolean(),
})

export const ErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})

export type Setup2FADTO = z.infer<typeof Setup2FASchema>
export type Verify2FADTO = z.infer<typeof Verify2FASchema>
export type Setup2FAResponseDTO = z.infer<typeof Setup2FAResponseSchema>
export type Verify2FAResponseDTO = z.infer<typeof Verify2FAResponseSchema>
export type ErrorResponseDTO = z.infer<typeof ErrorResponseSchema>
