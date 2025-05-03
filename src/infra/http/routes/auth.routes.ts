import { FastifyCustomInstance } from '../types/server'
import passport from '../middlewares/passport.middleware'
import { LoginUserSchema } from '../../../shared/schemas/userSchema'

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
      }),
    },
    async (req, rep) => {
      // Sucesso na autenticação
      //rep.redirect('/')
      const user = req.user
      rep.send(JSON.stringify(user, null, 2))
    }
  )
}
