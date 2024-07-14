import { Outlet, redirect } from 'react-router-dom'

import { getSession } from '~/api/session'
import { MainLayoutHeader } from '~/modules/main-layout/MainLayoutHeader'

export const loader = async () => {
  const session = await getSession()

  if (!session) {
    return redirect('/login')
  }

  return null
}
export const Component: Component = () => {
  return (
    <div>
      <MainLayoutHeader />
      <Outlet />
    </div>
  )
}
