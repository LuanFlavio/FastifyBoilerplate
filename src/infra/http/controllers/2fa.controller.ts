import { FastifyReply, FastifyRequest } from 'fastify'
import { TwoFactorAuthService } from '../../../application/2fa/2fa.service'
import { Setup2FADTO, Verify2FADTO } from '../../../shared/schemas/2fa.schema'

export class TwoFactorAuthController {
  constructor(private twoFactorAuthService: TwoFactorAuthService) {}

  async setup(
    request: FastifyRequest<{ Body: Setup2FADTO }>,
    reply: FastifyReply
  ) {
    try {
      const { userId } = request.body
      const result = await this.twoFactorAuthService.setup2FA(userId)

      return reply.status(200).send({
        success: true,
        data: result,
      })
    } catch (error) {
      return reply.status(400).send({
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro ao configurar 2FA',
      })
    }
  }

  async verify(
    request: FastifyRequest<{ Body: Verify2FADTO }>,
    reply: FastifyReply
  ) {
    try {
      const { userId, token } = request.body
      const isValid = await this.twoFactorAuthService.verify2FA(userId, token)

      return reply.status(200).send({
        success: true,
        isValid,
      })
    } catch (error) {
      return reply.status(400).send({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao verificar token 2FA',
      })
    }
  }
}
