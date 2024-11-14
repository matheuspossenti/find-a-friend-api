import { container } from 'tsyringe'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { GetPetUseCase } from 'src/use-cases/get-pet'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getPetParamsSchema.parse(request.params)

  const getPetUseCase = container.resolve(GetPetUseCase)

  const { pet } = await getPetUseCase.execute({ id })

  reply.status(201).send({ pet })
}
