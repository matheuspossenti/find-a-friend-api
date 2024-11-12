import { OrgsRepository } from 'src/repositories/orgs-repository'
import { PrismaOrgsRepository } from 'src/repositories/prisma/prisma-orgs-repository'
import { container } from 'tsyringe'

container.registerSingleton<OrgsRepository>(
  'OrgsRepository',
  PrismaOrgsRepository,
)
