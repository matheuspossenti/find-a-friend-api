import type { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

export function makePet(
  override?: Partial<Prisma.PetUncheckedCreateInput>,
): Prisma.PetUncheckedCreateInput {
  return {
    name: faker.person.firstName(),
    about: faker.lorem.paragraph(),
    age: faker.number.int().toString(),
    energy_level: faker.number.int().toString(),
    environment: faker.lorem.word(),
    size: faker.lorem.word(),
    org_id: randomUUID(),
    ...override,
  }
}
