import { useQuery } from '@tanstack/react-query'

import { users } from '@packages/drizzle/schema'

import { apiFetch } from '~/lib/api-fetch'

export const useSession = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      return apiFetch<typeof users.$inferSelect>('/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
  })

  return data
}
