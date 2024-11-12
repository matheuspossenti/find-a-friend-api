import { Org, type Prisma } from '@prisma/client'
import { OrgsRepository, type FindManyNearbyParams } from '../orgs-repository'
import { prisma } from 'src/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const orgs = await prisma.$queryRaw<Org[]>`SELECT * from orgs 
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`

    return orgs
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = prisma.org.create({
      data,
    })

    return org
  }
}
