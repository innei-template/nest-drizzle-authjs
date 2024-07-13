import { createRoot } from 'react-dom/client'

import './styles/index.css'

import { ClickToComponent } from 'click-to-react-component'
import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { initializeApp } from './initialize'
import { router } from './router'

initializeApp()
const $container = document.querySelector('#root') as HTMLElement

createRoot($container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ClickToComponent />
  </React.StrictMode>,
)
