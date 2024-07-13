import {
  Auth,
  createActionURL,
  setEnvDefaults,
  type AuthConfig,
  type Session,
} from '@meta-muse/complied'

import { API_VERSION } from '@core/app.config'
import { isDev } from '@core/global/env.global'
import type { IncomingMessage, ServerResponse } from 'http'
import { getRequest } from './req.util'

export type ServerAuthConfig = Omit<AuthConfig, 'raw'>
export type GetSessionResult = Promise<Session | null>
export async function getSessionBase(
  req: IncomingMessage,
  config: ServerAuthConfig,
) {
  setEnvDefaults(process.env, config)

  const protocol = (req.headers['x-forwarded-proto'] || 'http') as string
  const url = createActionURL(
    'session',
    protocol,
    // @ts-expect-error

    new Headers(req.headers),
    process.env,
    config.basePath,
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

function getBasePath() {
  return isDev ? '/auth' : `/api/v${API_VERSION}/auth`
}

export function CreateAuth(config: ServerAuthConfig) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    try {
      config.basePath = getBasePath()
      setEnvDefaults(process.env, config)

      const auth = await Auth(await toWebRequest(req), config)

      await toServerResponse(req, auth, res)
    } catch (error) {
      console.error(error)
      // throw error
      res.end(error.message)
    }
  }
}

export async function toWebRequest(req: IncomingMessage) {
  const host = req.headers.host || 'localhost'
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const base = `${protocol}://${host}`

  return getRequest(base, req)
}

async function toServerResponse(
  req: IncomingMessage,
  response: Response,
  res: ServerResponse,
) {
  response.headers.forEach((value, key) => {
    if (value) {
      res.setHeader(key, value)
    }
  })

  res.setHeader('Content-Type', response.headers.get('content-type') || '')
  res.setHeader('access-control-allow-methods', 'GET, POST')
  res.setHeader('access-control-allow-headers', 'content-type')
  res.setHeader(
    'access-control-allow-origin',
    req.headers.origin || req.headers.referer || req.headers.host || '*',
  )
  res.setHeader('access-control-allow-credentials', 'true')

  const text = await response.text()
  res.writeHead(response.status, response.statusText)
  res.end(text)
}
