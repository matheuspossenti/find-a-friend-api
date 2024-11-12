import { app } from 'src/app'
import { afterAll, beforeAll } from 'vitest'

beforeAll(async () => {
  app.ready()
})

afterAll(async () => {
  app.close()
})
