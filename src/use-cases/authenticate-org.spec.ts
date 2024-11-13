import { InMemoryOrgsRepository } from 'src/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeOrg } from 'test/factories/make-org'
import { hash } from 'bcryptjs'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(inMemoryOrgsRepository)
  })

  it('should authenticate an org', async () => {
    const password = 'password'

    inMemoryOrgsRepository.create(
      makeOrg({
        email: 'admin@admin.com',
        password: await hash(password, 8),
      }),
    )

    expect(async () => {
      await sut.execute({
        email: 'admin@admin.com',
        password: 'password',
      })
    }).not.toThrow()
  })
})
