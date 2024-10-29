import { SignUp } from '@clerk/nextjs'
import { Box } from '@mui/material';

export default function RegisterPage() {
  return (
    <Box sx={{ p: 3, maxWidth: '50%', margin: '0 auto' }}>
        <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4 
        }}>
            <SignUp />
        </Box>
    </Box>
  )
}