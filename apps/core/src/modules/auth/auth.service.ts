import { IncomingMessage } from 'node:http'
import { Injectable } from '@nestjs/common'

import {
  Auth,
  createActionURL,
  setEnvDefaults,
  type Session,
} from '@packages/compiled'
import { ServerAuthConfig } from './auth.implement'
import type { users } from '@packages/drizzle/schema'

export interface SessionUser {
  sessionToken: string
  userId: string
  expires: string
  user: typeof users.$inferSelect
}
@Injectable()
export class AuthService {
  constructor(private readonly authConfig: ServerAuthConfig) {}

  private async getSessionBase(req: IncomingMessage, config: ServerAuthConfig) {
    setEnvDefaults(process.env, config)

    const protocol = (req.headers['x-forwarded-proto'] || 'http') as string
    const url = createActionURL(
      'session',
      protocol,
      // @ts-expect-error

      new Headers(req.headers),
      process.env,
      config,
    )

    const response = await Auth(
      new Request(url, { headers: { cookie: req.headers.cookie ?? '' } }),
      config,
    )

    const { status = 200 } = response

    const data = await response.json()

    if (!data || !Object.keys(data).length) return null
    if (status === 200) return data
  }

  getSessionUser(req: IncomingMessage) {
    const { authConfig } = this
    return new Promise<SessionUser | null>((resolve) => {
      this.getSessionBase(req, {
        ...authConfig,
        callbacks: {
          ...authConfig.callbacks,
          async session(...args) {
            resolve(args[0].session as any as SessionUser)

            const session =
              (await authConfig.callbacks?.session?.(...args)) ??
              args[0].session
            const user = args[0].user ?? args[0].token
            return { user, ...session } satisfies Session
          },
        },
      }).then((session) => {
        if (!session) {
          resolve(null)
        }
      })
    })
  }
}
