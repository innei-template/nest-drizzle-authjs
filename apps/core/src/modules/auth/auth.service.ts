import { Injectable } from '@nestjs/common'
import { getSessionBase, ServerAuthConfig } from './auth.implement'

import type { Session } from '@meta-muse/complied'
import { IncomingMessage } from 'http'

export interface SessionUser {
  sessionToken: string
  userId: string
  expires: string
}
@Injectable()
export class AuthService {
  constructor(private readonly authConfig: ServerAuthConfig) {}

  getSessionUser(req: IncomingMessage) {
    const { authConfig } = this
    return new Promise<SessionUser | null>((resolve) => {
      getSessionBase(req, {
        ...authConfig,
        callbacks: {
          ...authConfig.callbacks,
          async session(...args) {
            resolve(args[0].session as SessionUser)

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
