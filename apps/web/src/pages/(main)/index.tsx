import { StyledButton } from '~/components/ui'
import { useSession } from '~/hooks/biz/useSession'
import { signIn, signOut } from '~/lib/auth'

export const Component = () => {
  const session = useSession()
  return (
    <div>
      {!!session && <pre>{JSON.stringify(session, null, 2)}</pre>}
      <StyledButton
        onClick={() => {
          if (!session) {
            signIn('github')
          } else {
            signOut()
          }
        }}
      >
        {!session ? 'Login by Github' : 'Logout'}
      </StyledButton>
    </div>
  )
}
