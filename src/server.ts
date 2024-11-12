import 'reflect-metadata'
import './shared/container'
import { env } from './env'
import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server started on port 3333')
  })
