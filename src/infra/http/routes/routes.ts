import CONFIG from '../../config'
import { FastifyCustomInstance } from '../types/server'
import { userRoute } from './users.routes'

const routePaths = {
  login: CONFIG.baseURL + '/login',
  metas: CONFIG.baseURL + '/metas',
  usuarios: CONFIG.baseURL + '/usuarios',
}

export function routes(fastify: FastifyCustomInstance): void {
  fastify.register(userRoute, { prefix: routePaths.usuarios })
}
