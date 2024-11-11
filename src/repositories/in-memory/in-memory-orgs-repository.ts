import { Org, type Prisma } from '@prisma/client'
import { OrgsRepository, type FindManyNearbyParams } from '../orgs-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinates } from 'src/utils/get-distance-between-coordinates'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Org[] | null> {
    return this.orgs.filter((org) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: org.latitude.toNumber(),
          longitude: org.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.orgs.push(org)

    return org
  }
}
