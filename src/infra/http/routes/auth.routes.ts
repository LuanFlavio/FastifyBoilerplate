import { FastifyCustomInstance } from '../types/server'
import passport from '../middlewares/passport.middleware'
import { LoginUserSchema } from '../../../shared/schemas/userSchema'
import { IUser } from '../../../shared/dtos/user.dto'
import { TwoFactorAuthController } from '../controllers/2fa.controller'
import { TwoFactorAuthService } from '../../../application/2fa/2fa.service'
import {
  Setup2FASchema,
  Verify2FASchema,
  Setup2FAResponseSchema,
  Verify2FAResponseSchema,
  ErrorResponseSchema,
  Setup2FADTO,
  Verify2FADTO,
} from '../../../shared/schemas/2fa.schema'
import { require2FA } from '../middlewares/2fa.middleware'

const twoFactorAuthService = new TwoFactorAuthService()
const twoFactorAuthController = new TwoFactorAuthController(
  twoFactorAuthService
)

export async function authRoutes(fastify: FastifyCustomInstance) {
  fastify.get(
    '/google',
    {
      schema: {
        description: 'Login with Google',
        summary: 'Login',
        tags: ['Auth'],
      },
      preValidation: passport.authenticate('google', {
        scope: ['profile', 'email'],
      }),
    },
    async (req, rep) => {
      // Redirecionamento será gerenciado pelo Passport
    }
  )

  fastify.get(
    '/google/callback',
    {
      schema: {
        description: 'Callback for Google authentication',
        summary: 'Callback',
        tags: ['Auth'],
      },
      preValidation: passport.authenticate('google', {
        failureRedirect: '/login',
      }),
    },
    async (req, rep) => {
      // Sucesso na autenticação
      //rep.redirect('/')
      const user = req.user
      rep.send(JSON.stringify(user, null, 2))
    }
  )

  fastify.post(
    '/login',
    {
      schema: {
        description: 'Login with local authentication',
        summary: 'Local Login',
        tags: ['Auth'],
        body: LoginUserSchema,
      },
      preValidation: passport.authenticate('local', {
        failureRedirect: '/login',
        session: false,
      }),
    },
    async (req, rep) => {
      const user = req.user
      if (!user) {
        return rep.status(401).send({ message: 'Unauthorized' })
      }
      rep.send({ message: 'Authentication successful', user })
    }
  )

  // Rotas de 2FA
  fastify.post<{ Body: Setup2FADTO }>(
    '/2fa/setup',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Configurar autenticação de dois fatores',
        description: 'Gera um segredo TOTP e QR Code para configuração do 2FA',
        body: Setup2FASchema,
        response: {
          200: Setup2FAResponseSchema,
          400: ErrorResponseSchema,
        },
      },
      preValidation: passport.authenticate('jwt', { session: false }),
    },
    twoFactorAuthController.setup.bind(twoFactorAuthController)
  )

  fastify.post<{ Body: Verify2FADTO }>(
    '/2fa/verify',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Verificar código TOTP',
        description: 'Verifica se o código TOTP fornecido é válido',
        body: Verify2FASchema,
        response: {
          200: Verify2FAResponseSchema,
          400: ErrorResponseSchema,
        },
      },
      preValidation: passport.authenticate('jwt', { session: false }),
    },
    twoFactorAuthController.verify.bind(twoFactorAuthController)
  )

  // Rota protegida com 2FA
  fastify.get(
    '/protected',
    {
      schema: {
        description: 'Protected route',
        summary: 'Protected',
        tags: ['Auth'],
      },
      preValidation: [
        passport.authenticate('jwt', { session: false }),
        require2FA,
      ],
    },
    async (req, rep) => {
      const user = req.user as IUser
      rep.send({ message: 'This is a protected route', user })
    }
  )
}
