import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Box } from '@mui/material';

import Sidebar from './Sidebar';
import { useUser } from '@/hooks/useUser';

const Navbar: React.FC = () => {
  const { userInfo } = useUser();

  return (
    <AppBar position='sticky'>
      <Box display={'flex'}>
        <Sidebar />
        {userInfo && (
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={userInfo.picture} alt={userInfo.name} />
          </Box>
        )}
      </Box>
      <Link to='/'>
        <Box
          component='img'
          sx={{ height: 105, marginLeft: 1, maxHeight: { md: 80, xs: 70 } }}
          alt='Sayag Services'
          src='/assets/logo.png'
        />
      </Link>
    </AppBar>
  );
};

export default Navbar;
