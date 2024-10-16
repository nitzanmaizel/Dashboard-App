import React from 'react';
import { useUser } from './hooks/useUser';
import { Box } from '@mui/material';

const App: React.FC = () => {
  const { userInfo, login } = useUser();
  console.log({ userInfo });

  return (
    <Box>
      <h1>Hello, {userInfo?.name}</h1>
      <button onClick={login}>Login</button>
    </Box>
  );
};

export default App;
