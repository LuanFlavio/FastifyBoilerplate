import passport from '@fastify/passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { env } from '../../config/env'

const callbackURL =
  env.NODE_ENV === 'production'
    ? 'https://seusite.com/api/v1/auth/google/callback'
    : 'http://localhost:3000/api/v1/auth/google/callback'

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: callbackURL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Aqui você pode salvar ou buscar o usuário no banco de dados
        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
        }
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  )
)

passport.registerUserSerializer(async (user: any) => {
  return user
})

passport.registerUserDeserializer(async (user: any) => {
  return user
})

export default passport
