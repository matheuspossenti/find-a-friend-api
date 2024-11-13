import { InMemoryPetsRepository } from 'src/repositories/in-memory/in-memory-pets-repostiory'
import { GetPetsUseCase } from './get-pets'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from 'src/repositories/in-memory/in-memory-orgs-repository'
import { makeOrg } from 'test/factories/make-org'
import { makePet } from 'test/factories/make-pet'
import { PetNotFoundError } from './errors/pet-not-found'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetsUseCase

describe('Get Pets', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryOrgsRepository)
    sut = new GetPetsUseCase(inMemoryPetsRepository)
  })

  it('should be able to get pets', async () => {
    const org = await inMemoryOrgsRepository.create(makeOrg())

    const pet = await inMemoryPetsRepository.create(
      makePet({ name: 'Rex', org_id: org.id }),
    )

    const pets = await sut.execute({
      id: pet.id,
    })

    expect(pets.pet.name).toBe('Rex')
  })

  it('should not be able to get an inexistent pet', async () => {
    await expect(
      sut.execute({
        id: 'invalid-id',
      }),
    ).rejects.toThrow(PetNotFoundError)
  })
})
