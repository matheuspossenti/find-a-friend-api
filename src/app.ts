import 'reflect-metadata'
import './shared/container'
import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/org/routes'
import { petsRoutes } from './http/controllers/pet/routes'

export const app = fastify()

app.register(orgsRoutes)
app.register(petsRoutes)
