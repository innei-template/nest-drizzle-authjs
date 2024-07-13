import { useQuery } from '@tanstack/react-query'

import { apiFetch } from '~/lib/api-fetch'

export const useSession = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      return apiFetch('/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
  })

  return data
}
