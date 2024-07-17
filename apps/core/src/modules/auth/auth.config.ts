import { API_VERSION, AUTH } from '@core/app.config'
import { isDev } from '@core/global/env.global'
import { DrizzleAdapter, authjs } from '@packages/complied'

import { db } from '@core/processors/database/database.service'
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from '@packages/drizzle/schema'
import type { ServerAuthConfig } from './auth.implement'

const {
  providers: { github: GitHub },
} = authjs

export const authConfig: ServerAuthConfig = {
  basePath: isDev ? '/auth' : `/api/v${API_VERSION}/auth`,
  secret: AUTH.secret,
  callbacks: {
    redirect({ url }) {
      return url
    },
  },
  providers: [
    GitHub({
      clientId: AUTH.github.clientId,
      clientSecret: AUTH.github.clientSecret,
    }),
  ],
  experimental: {
    enableWebAuthn: true,
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
}
