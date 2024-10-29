import { SignUp } from '@clerk/nextjs'

export default function RegisterPage() {
  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <SignUp />
      </div>
  )
}