import { PostModule } from '@core/modules/post/post.module'
import { schema } from '@meta-muse/drizzle'
import { createE2EApp } from '@test/helper/create-e2e-app'
import { drizzle } from '@test/lib/drizzle'
import { generateMockPost } from '@test/mock/data/post.data'

describe('ROUTE /posts', () => {
  const proxy = createE2EApp({
    imports: [PostModule],
  })

  beforeEach(async () => void (await drizzle.delete(schema.post)))

  test('GET /posts when has data', async () => {
    for (let i = 0; i < 5; i++) {
      const post = generateMockPost()
      await drizzle.insert(schema.post).values({
        ...post,
      })
    }

    const res = await proxy.app.inject({
      method: 'GET',
      url: '/posts',
    })

    expect(res.statusCode).toBe(200)
    const data = res.json()
    expect(data.length).toBe(5)
  })
})
