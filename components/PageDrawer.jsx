import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  Work,
  Person,
  CalendarMonth,
  AccountCircle,
  Settings,
} from '@mui/icons-material';

const drawerWidth = 240;

export default async function PageDrawer () {

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#fff',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)'
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <AccountCircle sx={{ width: 40, height: 40 }} />
          <Box>
            <Typography variant="subtitle1">Aiden</Typography>
            <Typography variant="body2" color="text.secondary">
              HR Manager
            </Typography>
          </Box>
        </Box>

        <List>
          {[
            { text: 'Dashboard', icon: <Dashboard /> },
            { text: 'Jobs', icon: <Work />, url: '/workforce/jobs' },
            { text: 'Create Job', url: '/workforce/jobs/create' },
            { text: 'Candidate', icon: <Person /> },
            { text: 'Calendar', icon: <CalendarMonth /> },
            { text: 'Profile', icon: <AccountCircle /> },
            { text: 'Setting', icon: <Settings /> },
          ].map((item) => (
            <ListItem key={item.text}>
              {item.text === 'Create Job' 
              ? <List sx={{ pl: 8 }}>
                <ListItemButton component="a" href={item.url || "#"}>
                  <ListItemText primary="Create Job" />
                </ListItemButton>
              </List> 
              :<ListItemButton href={item.url || "#"}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};