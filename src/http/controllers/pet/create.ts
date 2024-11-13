import { container } from 'tsyringe'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreatePetUseCase } from 'src/use-cases/create-pets'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    environment: z.string(),
    org_id: z.string(),
  })

  const { name, about, age, size, energy_level, environment, org_id } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = container.resolve(CreatePetUseCase)

  const { pet } = await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    org_id,
  })

  reply.status(201).send({ pet })
}
