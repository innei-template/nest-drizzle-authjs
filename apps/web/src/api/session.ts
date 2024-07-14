import type { Session } from '@auth/core/types'

import { apiFetch } from '~/lib/api-fetch'

export const getSession = async () => {
  return apiFetch<Session>('/auth/session')
}
