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
import { routes } from './routes'
import { FastifyCustomInstance } from './types/server'

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

server.listen({ port: Number(process.env.PORT) || 3000 }).then(() => {
  console.log('Server running - Port: ', Number(process.env.PORT) || 3000)
})
