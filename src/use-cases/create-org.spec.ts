import { InMemoryOrgsRepository } from 'src/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeOrg } from 'test/factories/make-org'
import { CreateOrgUseCase } from './create-org'
import { OrgAlreadyExists } from './errors/org-already-exists'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

beforeEach(() => {
  inMemoryOrgsRepository = new InMemoryOrgsRepository()
  sut = new CreateOrgUseCase(inMemoryOrgsRepository)
})

describe('Create Org', () => {
  it('should be able to create a org', async () => {
    const { org } = await sut.execute(
      makeOrg({
        name: 'Teco Business',
      }),
    )

    expect(org.name).toBe('Teco Business')
  })

  it('should be able to create a org with an existent email', async () => {
    const org = makeOrg()

    await inMemoryOrgsRepository.create(org)

    expect(sut.execute(org)).rejects.toThrow(OrgAlreadyExists)
  })
})
