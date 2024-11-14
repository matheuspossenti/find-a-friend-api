import { app } from 'src/app'
import { makeOrg } from 'test/factories/make-org'
import { makePet } from 'test/factories/make-pet'
import { describe, expect, it } from 'vitest'

describe('Get Pet', () => {
  it('should be able to get an pet', async () => {
    const org = await app.inject({
      method: 'POST',
      url: '/orgs',
      payload: makeOrg(),
    })

    const pet = await app.inject({
      method: 'POST',
      url: '/orgs/pets',
      payload: makePet({
        org_id: org.json().org.id,
      }),
    })

    const response = await app.inject({
      method: 'GET',
      url: `/orgs/pets/${pet.json().pet.id}`,
    })

    expect(response.statusCode).toBe(201)
  })
})
