import { app } from 'src/app'
import { makeOrg } from 'test/factories/make-org'
import { describe, expect, it } from 'vitest'

describe('Authenticate Org (E2E)', () => {
  it('should authenticate an org', async () => {
    const org = makeOrg()

    await app.inject({
      method: 'POST',
      url: '/orgs',
      payload: org,
    })

    const response = await app.inject({
      method: 'POST',
      url: '/orgs/authenticate',
      payload: {
        email: org.email,
        password: org.password,
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.json().token).toEqual(expect.any(String))
  })
})
