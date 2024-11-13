import { app } from 'src/app'
import { makeOrg } from 'test/factories/make-org'
import { describe, expect, it } from 'vitest'

describe('Fetch Nearby Org', () => {
  it('should fetch nearby orgs', async () => {
    const org = makeOrg()

    await app.inject({
      method: 'POST',
      url: '/orgs',
      payload: org,
    })

    const response = await app.inject({
      method: 'GET',
      url: '/orgs/nearby',
      query: {
        latitude: org.latitude.toString(),
        longitude: org.longitude.toString(),
      },
    })

    expect(response.statusCode).toBe(201)
  })
})
