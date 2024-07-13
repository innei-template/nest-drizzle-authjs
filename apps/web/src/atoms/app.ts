import { atom } from 'jotai'

import { createAtomHooks } from '~/lib/jotai'

export const [, , useAppIsReady, , , setAppIsReady] = createAtomHooks(
  atom(false),
)
