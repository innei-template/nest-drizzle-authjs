import { hashSync } from 'bcryptjs'
import { omit } from 'lodash'
import { nanoid } from 'nanoid'
import snakecaseKeys from 'snakecase-keys'

import { UserModule } from '@core/modules/user/user.module'
import { UserSchemaSerializeProjection } from '@core/modules/user/user.protect'
import { schema } from '@meta-muse/drizzle'
import { createE2EApp } from '@test/helper/create-e2e-app'
import { drizzle } from '@test/lib/drizzle'
import { generateMockUser } from '@test/mock/data/user.data'

describe('ROUTE /user', () => {
  const proxy = createE2EApp({
    imports: [UserModule],
  })

  it('POST /register', async () => {
    const mockUser = generateMockUser()
    const data = await proxy.app.inject({
      method: 'POST',
      url: '/user/register',
      body: mockUser,
    })

    expect(data.statusCode).toBe(201)
    const res = data.json()
    expect(res.password).toBeUndefined()
    expect(res).toMatchObject(
      snakecaseKeys(omit(mockUser, UserSchemaSerializeProjection.keys), {
        deep: true,
      }),
    )
  })

  it('POST /login', async () => {
    const password = 'password'
    const { username } = await drizzle.insert(schema.user).values({
      ...generateMockUser(),
      password: hashSync(password, 8),
      authCode: nanoid(8),
    })

    const data = await proxy.app.inject({
      method: 'POST',
      url: '/user/login',
      body: {
        username,
        password,
      },
    })

    expect(data.statusCode).toBe(200)
  })
})
