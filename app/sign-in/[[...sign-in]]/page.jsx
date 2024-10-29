import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }}>
        <SignIn />
    </div>
  )
}