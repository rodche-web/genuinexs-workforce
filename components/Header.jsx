'use client';

import { useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Notifications,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { SignOutButton } from './SignOutButton';

export default function Header () {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const handleSearchChange = e => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchText.trim()) {
      router.push(`/workforce/jobs?search=${searchText.trim()}`);
    }
  };

  return (
    <Box>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          color: 'black',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: '#00B8A9'
            }}
          >
            Workforce
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mx: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              px: 2
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
              onKeyUp={handleKeyPress}
              style={{
                border: 'none',
                background: 'none',
                outline: 'none',
                width: '100%',
                padding: '8px'
              }}
            />
          </Box>

          <IconButton>
            <AddIcon />
          </IconButton>
          <IconButton>
            <Notifications />
          </IconButton>
          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};