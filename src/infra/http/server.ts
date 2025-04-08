import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import fastifyPassport from '@fastify/passport'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastifySwagger } from '@fastify/swagger'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from '../config/env'

import { routes } from './routes/routes'
import { FastifyCustomInstance } from './types/server'
import { errorHandler } from '../../presentation/errors/app-error'

const server: FastifyCustomInstance =
  fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Fastify API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, { routePrefix: '/docs' })

server.register(fastifyCookie)

server.register(fastifySession, {
  secret: env.FASTIFY_SESSION_SECRET,
  cookie: {
    secure: false, // Use true em produção com HTTPS
    httpOnly: true,
    sameSite: 'lax',
  },
})

server.register(fastifyPassport.initialize())
server.register(fastifyPassport.secureSession())

server.register(routes)

server.setErrorHandler(errorHandler)

export { server }
