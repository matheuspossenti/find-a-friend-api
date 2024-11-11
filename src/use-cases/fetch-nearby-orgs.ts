import type { Org } from '@prisma/client'
import type { OrgsRepository } from 'src/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found'

interface FetchNearbyOrgsRequest {
  latitude: number
  longitude: number
}

interface FetchNearbyOrgsResponse {
  orgs: Org[]
}

export class FetchNearbyOrgs {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    latitude,
    longitude,
  }: FetchNearbyOrgsRequest): Promise<FetchNearbyOrgsResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude,
      longitude,
    })

    if (!orgs) {
      throw new OrgNotFoundError()
    }

    return { orgs }
  }
}
