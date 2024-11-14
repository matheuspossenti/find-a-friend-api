import { app } from 'src/app'
import { makeOrg } from 'test/factories/make-org'
import { makePet } from 'test/factories/make-pet'
import { describe, expect, it } from 'vitest'

describe('Create Pet', () => {
  it('should create an pet', async () => {
    const org = await app.inject({
      method: 'POST',
      url: '/orgs',
      payload: makeOrg(),
    })

    const pet = makePet({
      org_id: org.json().org.id,
    })

    const response = await app.inject({
      method: 'POST',
      url: '/pets',
      payload: pet,
    })

    expect(response.statusCode).toBe(201)
  })
})
