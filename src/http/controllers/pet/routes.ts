import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { getPet } from './get-pet'
import { searchPets } from './search-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', create)
  app.get('/orgs/pets', searchPets)
  app.get('/orgs/pets/:id', getPet)
}
