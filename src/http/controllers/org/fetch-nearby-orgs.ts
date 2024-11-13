import type { FastifyReply, FastifyRequest } from 'fastify'
import { FetchNearbyOrgsUseCase } from 'src/use-cases/fetch-nearby-orgs'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function fetchNearbyOrgs(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchNearbyOrgsParamsSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = fetchNearbyOrgsParamsSchema.parse(
    request.query,
  )

  const fetchNearbyOrgsUseCase = container.resolve(FetchNearbyOrgsUseCase)

  const { orgs } = await fetchNearbyOrgsUseCase.execute({ latitude, longitude })

  reply.status(201).send({ orgs })
}
