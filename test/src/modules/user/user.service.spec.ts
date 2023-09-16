import { UserService } from '@core/modules/user/user.service'
import { createServiceUnitTestApp } from '@test/helper/create-service-unit'
import { drizzle } from '@test/lib/drizzle'
import { generateMockUser } from '@test/mock/data/user.data'
import { authProvider } from '@test/mock/modules/auth.mock'

describe('/modules/user/user.service', () => {
  const proxy = createServiceUnitTestApp(UserService, {
    providers: [authProvider],
  })

  it('should register user successfully', async () => {
    const userModel = generateMockUser()
    await proxy.service.register(userModel)

    const user = await drizzle.query.user.findFirst({
      where(user, { eq }) {
        return eq(user.username, userModel.username)
      },
    })

    expect(user).toBeDefined()
    expect(user?.username).toBe(userModel.username)
  })

  it('should throw if existed', async () => {
    const userModel = generateMockUser()
    await proxy.service.register(userModel)

    await expect(proxy.service.register(userModel)).rejects.toThrowError()
  })
})
