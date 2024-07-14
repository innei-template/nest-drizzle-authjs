import { redirect } from 'react-router-dom'

import { useSession } from '~/hooks/biz/useSession'
import { signIn } from '~/lib/auth'

export const Component = () => {
  const session = useSession()
  if (session) {
    redirect('/')
    return null
  }

  return (
    <div className="center flex min-h-full grow flex-col gap-4">
      <h1 className="mb-8 text-3xl font-medium">Login to App</h1>

      <button
        className="btn block !w-72 rounded-xl"
        onClick={() => {
          signIn('github')
        }}
      >
        Login by Github
      </button>
    </div>
  )
}
