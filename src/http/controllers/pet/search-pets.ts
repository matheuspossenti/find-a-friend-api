import { container } from 'tsyringe'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { SearchPetUseCase } from 'src/use-cases/search-pets'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  })

  const { city, age, size, energy_level, environment } =
    getPetParamsSchema.parse(request.query)

  const searchPetsUseCase = container.resolve(SearchPetUseCase)

  const { pets } = await searchPetsUseCase.execute({
    city,
    age,
    size,
    energy_level,
    environment,
  })

  reply.status(201).send({ pets })
}
