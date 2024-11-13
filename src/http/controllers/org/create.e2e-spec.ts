import { app } from 'src/app'
import { makeOrg } from 'test/factories/make-org'
import { describe, expect, it } from 'vitest'

describe('Create Org', () => {
  it('should create an org', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/orgs',
      payload: makeOrg(),
    })

    expect(response.statusCode).toBe(201)
  })
})
