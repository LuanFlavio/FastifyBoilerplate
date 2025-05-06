import passport from '@fastify/passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as LocalStrategy } from 'passport-local'
import { env } from '../../config/env'
import { CreateUserUseCase } from '../../../application/user/useCases/CreateUserUseCase'
import { AuthController } from '../controllers/auth.controller'
import { UserRepositoryTest } from '../../../domain/mock/user.repository.mock'
import { GetByCredentialsUserUseCase } from '../../../application/user/useCases/GetByCredentialsUserUseCase'
import { GetByEmailUserUseCase } from '../../../application/user/useCases/GetByEmailUserUseCase'
import { randomUUID } from 'node:crypto'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const callbackURL =
  env.NODE_ENV === 'production'
    ? 'https://seusite.com/api/v1/auth/google/callback'
    : 'http://localhost:3000/api/v1/auth/google/callback'

const userRepositoryTest = new UserRepositoryTest()

const createUserUseCase = new CreateUserUseCase(userRepositoryTest)
const getByCredentialsUserUseCase = new GetByCredentialsUserUseCase(
  userRepositoryTest
)
const getByEmailUserUseCase = new GetByEmailUserUseCase(userRepositoryTest)
const controller = new AuthController(
  createUserUseCase,
  getByCredentialsUserUseCase,
  getByEmailUserUseCase
)

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      callbackURL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const user = {
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        password: randomUUID(),
      }
      const verifiedUser = await controller.google(user)

      if (verifiedUser) {
        done(null, verifiedUser)
      } else {
        done('error', false)
      }
    }
  )
)

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const verifiedUser = await controller.local({
        email,
        password,
      })
      if (verifiedUser) {
        done(null, verifiedUser)
      } else {
        done(null, false)
      }
    }
  )
)

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    const user = await controller.jwt(payload.email)

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
)

passport.registerUserSerializer(async (user: any) => {
  return user
})

passport.registerUserDeserializer(async (user: any) => {
  return user
})

export default passport
