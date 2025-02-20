import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
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

server.register(routes)

server.setErrorHandler(errorHandler)

export { server }
