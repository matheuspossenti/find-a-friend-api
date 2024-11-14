import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { getPet } from './get-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', create)
  app.get('/orgs/pets/:id', getPet)
  app.get('/orgs/pets/', getPet)
}
