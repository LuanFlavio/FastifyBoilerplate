import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { env } from '../../infra/config/env'

// Simulando armazenamento em memória (em produção, use o banco de dados)
const userSecrets = new Map<string, string>()

export class TwoFactorAuthService {
  async setup2FA(userId: string) {
    // Gerar segredo TOTP
    const secret = speakeasy.generateSecret({
      name: `FastifyBoilerplate:${userId}`,
      issuer: env.APP_NAME || 'FastifyBoilerplate',
    })

    // Salvar segredo (em produção, salve no banco de dados)
    userSecrets.set(userId, secret.base32)

    // Gerar QR Code
    const qrCode = await QRCode.toDataURL(secret.otpauth_url!)

    return {
      secret: secret.base32,
      qrCode,
    }
  }

  async verify2FA(userId: string, token: string) {
    const secret = userSecrets.get(userId)

    if (!secret) {
      throw new Error('2FA não configurado para este usuário')
    }

    // Verificar token
    const isValid = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1, // Permite 1 período antes/depois para sincronização
    })

    return isValid
  }

  is2FAEnabled(userId: string) {
    return userSecrets.has(userId)
  }
}
