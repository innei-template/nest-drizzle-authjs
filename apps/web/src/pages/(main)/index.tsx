import { StyledButton } from '~/components/ui'
import { useSession } from '~/hooks/biz/useSession'
import { signIn } from '~/lib/auth'

export const Component = () => {
  const data = useSession()
  return (
    <div>
      {!!data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <StyledButton
        onClick={() => {
          signIn('github')
        }}
      >
        Login by Github
      </StyledButton>
    </div>
  )
}
