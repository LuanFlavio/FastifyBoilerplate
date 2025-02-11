import { log } from './infra/config/logger'
import { server } from './infra/http/server'
import { env } from './infra/config/env'

server
  .listen({ port: env.PORT })
  .then(() => {
    console.log('Server running - Port: ', env.PORT)
  })
  .catch((err) => log(err))
