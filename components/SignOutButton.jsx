'use client'

import { useClerk } from '@clerk/nextjs';
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <Button
    variant="contained"
    sx={{ 
      bgcolor: green[600],
      '&:hover': {
        bgcolor: green[700]
      }
    }}
    onClick={() => signOut({ redirectUrl: '/sign-in' })}
  >
    Sign out
  </Button>
  )
}