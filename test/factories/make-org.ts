import type { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

export function makeOrg(
  override?: Partial<Prisma.OrgCreateInput>,
): Prisma.OrgCreateInput {
  return {
    id: randomUUID(),
    name: faker.company.name(),
    author_name: faker.person.firstName(),
    email: faker.internet.email(),
    whatsapp: faker.phone.number(),
    password: faker.internet.password(),
    cep: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    neighborhood: faker.lorem.word(),
    street: faker.location.street(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    ...override,
  }
}
