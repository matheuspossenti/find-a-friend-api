import { InMemoryOrgsRepository } from 'src/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from 'src/repositories/in-memory/in-memory-pets-repostiory'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeOrg } from 'test/factories/make-org'
import { makePet } from 'test/factories/make-pet'
import { OrgNotFoundError } from './errors/org-not-found'
import { CreatePetUseCase } from './create-pets'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

beforeEach(() => {
  inMemoryOrgsRepository = new InMemoryOrgsRepository()
  inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryOrgsRepository)
  sut = new CreatePetUseCase(inMemoryPetsRepository, inMemoryOrgsRepository)
})

describe('Create Org', () => {
  it('should be able to create a pet', async () => {
    const org = await inMemoryOrgsRepository.create(
      makeOrg({
        name: 'Teco',
      }),
    )

    const { pet } = await sut.execute(makePet({ name: 'Rex', org_id: org.id }))

    expect(pet.name).toBe('Rex')
  })

  it('should not be able to create a pet with an invalid org', async () => {
    await expect(
      sut.execute(makePet({ name: 'Rex', org_id: 'invalid-id' })),
    ).rejects.toThrow(OrgNotFoundError)
  })
})
