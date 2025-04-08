import CONFIG from '../../config'
import { FastifyCustomInstance } from '../types/server'
import { authRoutes } from './auth.routes'
import { userRoute } from './users.routes'

const routePaths = {
  auth: CONFIG.baseURL + '/auth',
  metas: CONFIG.baseURL + '/metas',
  usuarios: CONFIG.baseURL + '/usuarios',
}

export function routes(fastify: FastifyCustomInstance): void {
  fastify.register(authRoutes, { prefix: routePaths.auth })
  fastify.register(userRoute, { prefix: routePaths.usuarios })
}
