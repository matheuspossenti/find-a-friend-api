import 'reflect-metadata'
import './shared/container'
import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/org/routes'
import { petsRoutes } from './http/controllers/pet/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_TOKEN,
  sign: {
    expiresIn: '7d',
  },
})

app.register(fastifyCookie)

app.register(orgsRoutes)
app.register(petsRoutes)
