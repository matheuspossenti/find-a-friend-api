import { InMemoryOrgsRepository } from 'src/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeOrg } from 'test/factories/make-org'
import { FetchNearbyOrgsUseCase } from './fetch-nearby-orgs'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: FetchNearbyOrgsUseCase

describe('Search Pet', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new FetchNearbyOrgsUseCase(inMemoryOrgsRepository)
  })

  it('should be able to fetch nearby orgs', async () => {
    await inMemoryOrgsRepository.create(
      makeOrg({
        name: 'Near Org',
        latitude: -27.0077083,
        longitude: -51.1619002,
      }),
    )

    await inMemoryOrgsRepository.create(
      makeOrg({
        name: 'Far Org',
        latitude: -29.0077083,
        longitude: -51.1619002,
      }),
    )

    const { orgs } = await sut.execute({
      latitude: -27.0077093,
      longitude: -51.1619002,
    })

    expect(orgs).toHaveLength(1)
    expect(orgs).toEqual([expect.objectContaining({ name: 'Near Org' })])
  })
})
