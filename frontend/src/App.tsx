import React from 'react';
import { Typography } from '@mui/material';

import PageWrapper from '@/components/Layout/PageWrapper';
import { useUser } from '@/hooks/useUser';

const App: React.FC = () => {
  const { userInfo } = useUser();

  return (
    <PageWrapper>
      <Typography variant='h1'>Hello, {userInfo?.name}</Typography>
    </PageWrapper>
  );
};

export default App;
