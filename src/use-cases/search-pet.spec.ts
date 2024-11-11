import { InMemoryOrgsRepository } from 'src/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from 'src/repositories/in-memory/in-memory-pets-repostiory'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetUseCase } from './search-pets'
import { makePet } from 'test/factories/make-pet'
import { makeOrg } from 'test/factories/make-org'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: SearchPetUseCase

describe('Search Pet', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryOrgsRepository)
    sut = new SearchPetUseCase(inMemoryPetsRepository)
  })

  it('should be able to search pets', async () => {
    const org = await inMemoryOrgsRepository.create(makeOrg())
    const org2 = await inMemoryOrgsRepository.create(makeOrg())

    for (let i = 0; i < 5; i++) {
      await inMemoryPetsRepository.create(
        makePet({ name: `Rex ${i}`, org_id: org.id }),
      )
    }

    await inMemoryPetsRepository.create(
      makePet({ name: 'Teco', org_id: org2.id }),
    )

    const pets = await sut.execute({
      city: org.city,
    })

    expect(pets.pets.length).toBe(5)
  })
})
