import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticateOrgUseCase } from 'src/use-cases/authenticate-org'
import { InvalidPasswordError } from 'src/use-cases/errors/invalid-password'
import { container } from 'tsyringe'
import { z } from 'zod'

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = bodySchema.parse(request.body)

  const authenticateOrgUseCase = container.resolve(AuthenticateOrgUseCase)

  try {
    const { org } = await authenticateOrgUseCase.execute(body)

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidPasswordError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
