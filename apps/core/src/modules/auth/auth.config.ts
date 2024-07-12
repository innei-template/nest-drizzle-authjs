import { authjs } from '@meta-muse/complied'
import { isDev } from '@core/global/env.global'
import { API_VERSION, AUTH } from '@core/app.config'
import { CreateAuth } from './auth.util'

const {
  providers: { github: GitHub },
} = authjs

export const authHandler = CreateAuth({
  basePath: isDev ? 'auth' : `/api/v${API_VERSION}/auth`,
  secret: AUTH.secret,
  providers: [
    GitHub({
      clientId: AUTH.github.clientId,
      clientSecret: AUTH.github.clientSecret,
    }),
  ],
})
