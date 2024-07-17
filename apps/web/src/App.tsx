import { Outlet } from 'react-router-dom'
import type { FC } from 'react'

import { useAppIsReady } from './atoms/app'
import { RootProviders } from './providers/root-providers'

export const App: FC = () => {
  return (
    <RootProviders>
      <AppLayer />
    </RootProviders>
  )
}

const AppLayer = () => {
  const appIsReady = useAppIsReady()
  return appIsReady ? <Outlet /> : <AppSkeleton />
}

const AppSkeleton = () => {
  return null
}
// eslint-disable-next-line import/no-default-export
export default App
