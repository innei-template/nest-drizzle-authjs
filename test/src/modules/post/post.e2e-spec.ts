import snakecaseKeys from 'snakecase-keys'

import { PostModule } from '@core/modules/post/post.module'
import { snowflake } from '@core/processors/database/snowflake.util'
import { createE2EApp } from '@test/helper/create-e2e-app'
import { reDeserializeData } from '@test/helper/serialize-data'
import { prisma } from '@test/lib/prisma'
import { generateMockCategory } from '@test/mock/data/category.data'
import { generateMockPost } from '@test/mock/data/post.data'

describe('ROUTE /posts', () => {
  const proxy = createE2EApp({
    imports: [PostModule],
  })

  const createMockCategory = async () => {
    return await prisma.category.create({
      data: {
        ...generateMockCategory(),
        slug: `test${snowflake.nextId()}`,
      },
    })
  }
  beforeEach(async () => void (await prisma.post.deleteMany()))

  it('GET /posts when nothing', async () => {
    const res = await proxy.app.inject('/posts')
    expect(res.statusCode).toBe(200)
    expect(res.json()).toMatchInlineSnapshot(`
{
  "data": [],
  "pagination": {
    "current_page": 1,
    "has_next_page": false,
    "has_prev_page": false,
    "size": 10,
    "total": 0,
    "total_page": 0,
  },
}
`)
  })

  test('GET /posts when has data and un published', async () => {
    const cate = await createMockCategory()

    for (let i = 0; i < 5; i++) {
      const post = generateMockPost()
      await prisma.post.create({
        data: {
          ...post,
          categoryId: cate.id,
          pin: false,
          isPublished: i % 2 === 0,
        },
      })
    }

    const res = await proxy.app.inject({
      method: 'GET',
      url: '/posts',
    })

    expect(res.statusCode).toBe(200)
    const data = res.json()
    expect(data.data.length).toBe(3)
  })

  test('GET /posts/:id should work', async () => {
    const cate = await createMockCategory()

    const post = generateMockPost()
    const postData = await prisma.post.create({
      data: {
        ...post,
        categoryId: cate.id,
        pin: false,
      },
    })

    const res = await proxy.app.inject({
      method: 'GET',
      url: `/posts/${postData.id}`,
    })

    expect(res.statusCode).toBe(200)
    const data = res.json()
    expect(data).toMatchObject(
      snakecaseKeys({
        ...reDeserializeData(postData),
        category: reDeserializeData(cate),
      }),
    )
  })

  test('GET /posts/:id should 404 when un published', async () => {
    const cate = await createMockCategory()

    const post = generateMockPost()
    const postData = await prisma.post.create({
      data: {
        ...post,
        categoryId: cate.id,
        pin: false,
        isPublished: false,
      },
    })

    const res = await proxy.app.inject({
      method: 'GET',
      url: `/posts/${postData.id}`,
    })

    expect(res.statusCode).toBe(404)
  })

  test('GET /posts/:category/:slug should 404 when un published', async () => {
    const cate = await createMockCategory()

    const post = generateMockPost()
    const postData = await prisma.post.create({
      data: {
        ...post,
        categoryId: cate.id,
        pin: false,
        isPublished: false,
      },
    })

    const res = await proxy.app.inject({
      method: 'GET',
      url: `/posts/${cate.slug}/${postData.slug}`,
    })

    expect(res.statusCode).toBe(404)
  })

  test('GET /posts/:category/:slug should work', async () => {
    const cate = await createMockCategory()

    const post = generateMockPost()
    const postData = await prisma.post.create({
      data: {
        ...post,
        categoryId: cate.id,
        pin: false,
      },
    })

    const res = await proxy.app.inject({
      method: 'GET',
      url: `/posts/${cate.slug}/${postData.slug}`,
    })

    expect(res.statusCode).toBe(200)
    const data = res.json()
    expect(data).toMatchObject(
      snakecaseKeys({
        ...reDeserializeData(postData),
        category: reDeserializeData(cate),
      }),
    )
  })

  test('POST /admin/posts create post', async () => {
    const cate = await createMockCategory()
    const res = await proxy.app.inject({
      method: 'POST',

      url: '/admin/posts',
      payload: {
        ...generateMockPost(),

        categoryId: cate.id,
        slug: 'I I',
      },
    })

    expect(res.statusCode).toBe(201)
    const data = res.json()
    expect(data.slug).toBe('i-i')
  })

  test('PUT /admin/posts put post', async () => {
    const cate = await createMockCategory()
    const { id: postId } = await prisma.post.create({
      data: {
        ...generateMockPost(),
        categoryId: cate.id,
      },
    })
    const updatedValue = generateMockPost()
    const res = await proxy.app.inject({
      method: 'put',

      url: `/admin/posts/${postId}`,
      payload: {
        ...updatedValue,

        categoryId: cate.id,
        slug: 'I I',
      },
    })

    const data = res.json()
    expect(data.title).toBe(updatedValue.title)
  })

  test('PUT /admin/posts/:id update related post', async () => {
    const posts = new Array(5).fill(0).map(() => generateMockPost())
    const cate = await createMockCategory()
    const postsModel = posts.map((post) => ({
      ...post,
      categoryId: cate.id,
    }))

    await prisma.post.createMany({
      data: postsModel,
    })
    const createdPosts = await prisma.post.findMany({})

    await proxy.app.inject({
      method: 'patch',
      url: `/admin/posts/${createdPosts[0].id}`,
      payload: {
        related: [createdPosts[1].id],
      },
    })

    const res = await proxy.app.inject({
      method: 'GET',
      url: `/posts/${cate.slug}/${createdPosts[0].slug}`,
    })

    expect(res.json().related.map((r) => r.id)).toStrictEqual([
      createdPosts[1].id,
    ])
  })
})
