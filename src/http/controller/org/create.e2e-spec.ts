import { app } from 'src/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Org', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should create an org', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/orgs',
      payload: {
        name: 'Org 1',
        description: 'Org 1 description',
      },
    })

    expect(response.statusCode).toBe(201)
    expect(response.json()).toEqual({
      id: expect.any(String),
      name: 'Org 1',
      description: 'Org 1 description',
    })
  })
})
