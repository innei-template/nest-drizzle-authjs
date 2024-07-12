import * as AuthCore from '@auth/core'
import * as AuthCoreAdapters from '@auth/core/adapters'

import * as AuthCoreErrors from '@auth/core/errors'
import * as AuthCoreGoogle from '@auth/core/providers/google'
import * as AuthCoreGithub from '@auth/core/providers/github'

export const authjs = {
  ...AuthCore,
  ...AuthCoreAdapters,

  ...AuthCoreErrors,
  providers: {
    google: AuthCoreGoogle.default,
    github: AuthCoreGithub.default,
  },
}

export type * from '@auth/core/errors'
export type * from '@auth/core/types'
export type * from '@auth/core/providers/google'
export type * from '@auth/core/providers/github'
export * from '@auth/core'

export type * from '@auth/core/adapters'

export { DrizzleAdapter } from '@auth/drizzle-adapter'
