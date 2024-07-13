import { createFetch } from 'ofetch'

import { getCsrfToken } from './auth'

let csrfTokenPromise: Promise<string> | null = null
export const apiFetch = createFetch({
  defaults: {
    baseURL: import.meta.env.VITE_API_URL,
    credentials: 'include',
    async onRequest({ options }) {
      if (!csrfTokenPromise) csrfTokenPromise = getCsrfToken()

      const csrfToken = await csrfTokenPromise
      if (options.method && options.method.toLowerCase() !== 'get') {
        if (typeof options.body === 'string') {
          options.body = JSON.parse(options.body)
        }
        if (!options.body) {
          options.body = {}
        }
        if (options.body instanceof FormData) {
          options.body.append('csrfToken', csrfToken)
        } else {
          ;(options.body as Record<string, unknown>).csrfToken = csrfToken
        }
      }
    },
  },
})
