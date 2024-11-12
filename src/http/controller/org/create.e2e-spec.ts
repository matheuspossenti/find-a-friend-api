import { app } from 'src/app'
import { makeOrg } from 'test/factories/make-org'
import { describe, expect, it } from 'vitest'

describe('Create Org', () => {
  it('should create an org', async () => {
    const org = makeOrg({
      name: 'Org 1',
    })

    console.log(org)

    const response = await app.inject({
      method: 'POST',
      url: '/orgs',
      payload: {
        name: 'Org 1',
        author_name: 'Jeremie',
        email: 'Jason72@hotmail.com',
        whatsapp: '733.682.7485 x451',
        password: 'vtQzjuz4fe92D5D',
        cep: '65583-4619',
        state: 'Massachusetts',
        city: 'Kassulketown',
        neighborhood: 'aiunt',
        street: 'Kemmer Greens',
        latitude: 52.2306,
        longitude: -139.9196,
      },
    })

    console.log(response.json())

    expect(response.statusCode).toBe(201)
  })
})
