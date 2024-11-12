import 'reflect-metadata'
import './shared/container'
import fastify from 'fastify'
import { orgsRoutes } from './http/controller/org/routes'

export const app = fastify()

app.register(orgsRoutes)
