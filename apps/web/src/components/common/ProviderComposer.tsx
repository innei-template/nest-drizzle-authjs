'use client'

import { cloneElement } from 'react'
import type { JSX } from 'react'

export const ProviderComposer: Component<{
  contexts: JSX.Element[]
}> = ({ contexts, children }) =>
  contexts.reduceRight(
    (kids: any, parent: any) => cloneElement(parent, { children: kids }),
    children,
  )
