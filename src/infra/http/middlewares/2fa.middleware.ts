import { FastifyReply, FastifyRequest } from 'fastify'
import { TwoFactorAuthService } from '../../../application/2fa/2fa.service'

const twoFactorAuthService = new TwoFactorAuthService()

export async function require2FA(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as { id: string }

  if (!user) {
    return reply.status(401).send({
      success: false,
      message: 'Usuário não autenticado',
    })
  }

  const is2FAEnabled = twoFactorAuthService.is2FAEnabled(user.id)

  if (is2FAEnabled) {
    // Se o usuário não forneceu o token 2FA
    if (!request.headers['x-2fa-token']) {
      return reply.status(403).send({
        success: false,
        message: 'Token 2FA necessário',
        requires2FA: true,
      })
    }

    // Verificar o token 2FA
    const isValid = await twoFactorAuthService.verify2FA(
      user.id,
      request.headers['x-2fa-token'] as string
    )

    if (!isValid) {
      return reply.status(403).send({
        success: false,
        message: 'Token 2FA inválido',
      })
    }
  }

  // Se chegou aqui, ou o 2FA não está habilitado ou o token é válido
  return
}
