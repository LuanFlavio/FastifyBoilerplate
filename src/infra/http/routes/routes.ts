import CONFIG from '../../config'
import { FastifyCustomInstance } from '../types/server'
import { authRoutes } from './auth.routes'
import { userRoute } from './users.routes'

const routePaths = {
  auth: CONFIG.baseURL + '/auth',
  statistics: CONFIG.baseURL + '/statistics',
  users: CONFIG.baseURL + '/users',
}

export function routes(fastify: FastifyCustomInstance): void {
  fastify.register(authRoutes, { prefix: routePaths.auth })
  fastify.register(userRoute, { prefix: routePaths.users })
}
