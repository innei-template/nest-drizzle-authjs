import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from '@headlessui/react'
import * as Avatar from '@radix-ui/react-avatar'

import { useSession } from '~/hooks/biz/useSession'
import { signOut } from '~/lib/auth'

export const MainLayoutHeader = () => {
  const session = useSession()
  if (!session) return null
  return (
    <header className="flex justify-between p-5">
      <div />
      <MainAvatar />
    </header>
  )
}

const MainAvatar = () => {
  const session = useSession()!
  return (
    <Menu>
      <MenuButton>
        <Avatar.Root>
          <Avatar.Image
            className="size-8 rounded-full border"
            src={session.image || ''}
            alt={session.name || ''}
          />
          <Avatar.Fallback className="size-8 rounded-full border">
            {session.name?.charAt(0)}
          </Avatar.Fallback>
        </Avatar.Root>
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="mt-2 w-52 origin-top-right rounded-xl border border-neutral/50 bg-neutral/5 p-1 text-sm/6 text-base-content transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] data-[closed]:scale-95 data-[closed]:opacity-0 focus:outline-none"
      >
        <MenuItem>
          <div className="mb-2 flex items-center justify-between px-3 py-1.5">
            <span className="text-lg font-medium">{session.name}</span>

            <Avatar.Root>
              <Avatar.Image
                className="size-8 rounded-full border"
                src={session.image || ''}
                alt={session.name || ''}
              />
              <Avatar.Fallback className="size-8 rounded-full border">
                {session.name?.charAt(0)}
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
        </MenuItem>
        <MenuSeparator className="my-1 h-px bg-neutral" />
        <MenuItem>
          <button
            onClick={() => signOut()}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
          >
            <i className="i-mingcute-exit-line" />
            Logout
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
