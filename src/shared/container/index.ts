import { OrgsRepository } from 'src/repositories/orgs-repository'
import { PetsRepository } from 'src/repositories/pets-repository'
import { PrismaOrgsRepository } from 'src/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from 'src/repositories/prisma/prisma-pets-repository'
import { container } from 'tsyringe'

container.registerSingleton<OrgsRepository>(
  'OrgsRepository',
  PrismaOrgsRepository,
)
container.registerSingleton<PetsRepository>(
  'PetsRepository',
  PrismaPetsRepository,
)
