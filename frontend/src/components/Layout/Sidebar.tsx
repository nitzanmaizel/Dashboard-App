import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Divider, Box, Drawer, Button } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import IconWrapper from '@/components/IconWrapper/IconWrapper';
import { useUser } from '@/hooks/useUser';

const Sidebar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { userInfo, login, logout } = useUser();

  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box role='presentation' onClick={toggleDrawer(false)}>
      <List>
        {SidebarList.map(({ id, text, icon, link }) => (
          <ListItem key={id} disablePadding sx={{ margin: 0 }}>
            <ListItemButton onClick={() => navigate(link)}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <IconWrapper type={icon} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem key='logout' disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <IconWrapper type='logout' />
            </ListItemIcon>
            <ListItemText primary='התנתקות' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const LoginDrawer = (
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
      <List>
        <ListItem key='login' disablePadding>
          <ListItemButton onClick={login}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <IconWrapper type='login' />
            </ListItemIcon>
            <ListItemText primary='התחברות' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer(true)}>
        <IconWrapper type='menu' fontSize='large' sx={{ color: '#fff' }} />
      </Button>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        {userInfo ? DrawerList : LoginDrawer}
      </Drawer>
    </React.Fragment>
  );
};

export default Sidebar;

const SidebarList = [
  { id: '1', text: 'בית', icon: 'home', link: '/' },
  { id: '2', text: 'מרכז שליטה', icon: 'dashboard', link: '/dashboard' },
  { id: '3', text: 'יצירת מסמך', icon: 'addDoc', link: '/create' },
  { id: '4', text: 'מסמכים אחרונים', icon: 'doc', link: '/recent' },
  { id: '5', text: 'חיפוש מסמך', icon: 'searchDoc', link: '/search' },
  { id: '6', text: 'אודות', icon: 'info', link: '/about' },
];
