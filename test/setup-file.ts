import { redisHelper } from './helper/redis-mock.helper'
import resetDb from './lib/reset-db'

beforeAll(async () => {
  await resetDb()
})

afterAll(async () => {
  await resetDb()
  await (await redisHelper).close()
})
