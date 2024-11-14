import { app } from 'src/app'
import { makeOrg } from 'test/factories/make-org'
import { makePet } from 'test/factories/make-pet'
import { describe, expect, it } from 'vitest'

describe('Search Pets', () => {
  it.only('should be able to search pets', async () => {
    const org = await app.inject({
      method: 'POST',
      url: '/orgs',
      payload: makeOrg(),
    })

    await app.inject({
      method: 'POST',
      url: '/orgs/pets',
      payload: makePet({
        org_id: org.json().org.id,
      }),
    })

    await app.inject({
      method: 'POST',
      url: '/orgs/pets',
      payload: makePet({
        org_id: org.json().org.id,
      }),
    })

    await app.inject({
      method: 'POST',
      url: '/orgs/pets',
      payload: makePet({
        org_id: org.json().org.id,
      }),
    })

    await app.inject({
      method: 'POST',
      url: '/orgs/pets',
      payload: makePet({
        org_id: org.json().org.id,
      }),
    })

    const response = await app.inject({
      method: 'GET',
      url: '/orgs/pets',
      query: {
        city: org.json().org.city,
      },
    })

    expect(response.statusCode).toBe(201)
  })
})
