import jwt from 'jsonwebtoken'
import { env } from '../../config/env'

const JWT_SECRET = env.JWT_SECRET
const JWT_EXPIRES_IN = '1h'

export interface JwtPayload {
  id: string
  email: string
}

export class JwtUtils {
  /**
   * Gera um token JWT para o usuário
   * @param payload Dados do usuário (id e email)
   * @returns Token JWT
   */
  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  }

  /**
   * Valida e decodifica um token JWT
   * @param token Token JWT
   * @returns Dados do payload ou null se inválido
   */
  static verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch (error) {
      console.error('Invalid JWT token:', error)
      return null
    }
  }
}
