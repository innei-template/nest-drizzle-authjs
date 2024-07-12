/* eslint-disable no-async-promise-executor */
import { authConfig } from './auth.config'
import { getSessionBase } from './auth.implement'
import type { users } from '@meta-muse/drizzle/schema'
import type { Session } from '@meta-muse/complied'
import type { FastifyRequest } from 'fastify'

export const getSession = (req: FastifyRequest) =>
  getSessionBase(req, authConfig)

export interface SessionUser {
  sessionToken: string
  userId: string
  expires: string
  user: typeof users.$inferSelect
}
export const getSessionUser = (req: FastifyRequest) => {
  return new Promise<SessionUser | null>(async (resolve) => {
    const session = await getSessionBase(req, {
      ...authConfig,
      callbacks: {
        ...authConfig.callbacks,
        async session(...args) {
          resolve(args[0].session as SessionUser)

          const session =
            (await authConfig.callbacks?.session?.(...args)) ?? args[0].session
          const user = args[0].user ?? args[0].token
          return { user, ...session } satisfies Session
        },
      },
    })

    if (!session) {
      resolve(null)
    }
  })
}
