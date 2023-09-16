import { PostService } from '@core/modules/post/post.service'
import { createServiceUnitTestApp } from '@test/helper/create-service-unit'
import resetDb from '@test/lib/reset-db'
import { mockPostInputData } from '@test/mock/data/post.data'

describe('/modules/post/post.service', () => {
  const proxy = createServiceUnitTestApp(PostService)

  beforeEach(async () => {
    await resetDb()
  })

  it('should create post successful', async () => {
    const result = await proxy.service.create({
      ...mockPostInputData,
    })

    expect(result).toMatchObject({
      ...mockPostInputData,
    })
  })
})
