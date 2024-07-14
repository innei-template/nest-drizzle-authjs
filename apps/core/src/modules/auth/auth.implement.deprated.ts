import {
  Auth,
  type AuthConfig,
  type Session,
  createActionURL,
  setEnvDefaults,
} from '@packages/complied'

import { API_VERSION } from '@core/app.config'
import { isDev } from '@core/global/env.global'
import type { FastifyReply, FastifyRequest } from 'fastify'

export type FastifyAuthConfig = Omit<AuthConfig, 'raw'>
export type GetSessionResult = Promise<Session | null>

export async function getSessionBase(
  req: FastifyRequest,
  config: FastifyAuthConfig,
) {
  setEnvDefaults(process.env, config)

  const url = createActionURL(
    'session',
    req.protocol,
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

export function CreateAuth(config: FastifyAuthConfig) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    try {
      config.basePath = getBasePath()
      setEnvDefaults(process.env, config)

      const auth = await Auth(toWebRequest(req), config)

      await toFastifyResponse(req, auth, res)
    } catch (error) {
      // throw error
      res.send(error.message)
    }
  }
}

export function toWebRequest(req: FastifyRequest) {
  const url = `${req.protocol}://${req.hostname}${req.url}`

  const headers = new Headers()

  Object.entries(req.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        v && headers.append(key, v)
      })
      return
    }

    value && headers.append(key, value)
  })

  // GET and HEAD not allowed to receive body
  const body = /GET|HEAD/.test(req.method) ? undefined : encodeRequestBody(req)

  const request = new Request(url, {
    method: req.method,
    headers,
    body,
  })

  return request
}

function encodeRequestBody(req: FastifyRequest) {
  const contentType = req.headers['content-type']

  if (contentType?.includes('application/x-www-form-urlencoded')) {
    return encodeUrlEncoded(req.body as Record<string, any>)
  }

  if (contentType?.includes('application/json')) {
    return encodeJson(req.body as Record<string, any>)
  }

  return req.body as ReadableStream | string | undefined
}

function encodeUrlEncoded(object: Record<string, any> = {}) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(object)) {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v))
    } else {
      params.append(key, value)
    }
  }

  return params.toString()
}

function encodeJson(obj: Record<string, any>) {
  return JSON.stringify(obj)
}

async function toFastifyResponse(
  req: FastifyRequest,
  response: Response,
  res: FastifyReply,
) {
  response.headers.forEach((value, key) => {
    if (value) {
      res.header(key, value)
    }
  })

  res.status(response.status)

  res.header('Content-Type', response.headers.get('content-type') || '')
  res.header('access-control-allow-methods', 'GET, POST')
  res.header('access-control-allow-headers', 'content-type')
  res.header(
    'access-control-allow-origin',
    req.headers.origin || req.headers.referer || req.headers.host || '*',
  )
  res.header('access-control-allow-credentials', 'true')

  const text = await response.text()

  res.send(text)
}
