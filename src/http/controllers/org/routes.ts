import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetchNearbyOrgs } from './fetch-nearby-orgs'
import { authenticate } from './authenticate'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.get('/orgs/nearby', fetchNearbyOrgs)
  app.post('/orgs/authenticate', authenticate)
}
