import React from 'react';
import { Box, Typography } from '@mui/material';
import { Row } from '@/types/DataGridTypes';

interface DataGridUserInfoProps {
  selectedRow: Row;
  headers: string[];
}

const DataGridUserInfo: React.FC<DataGridUserInfoProps> = ({ selectedRow, headers }) => {
  return (
    <Box display='flex' flexWrap='wrap'>
      {Object.entries(selectedRow)
        .filter(([key]) => headers.indexOf(key) < 12 && key !== 'id')
        .map(([key, value]) => (
          <Box key={key} flex={1} border='1px solid #000' p={1} m={1} minWidth='200px'>
            <Typography variant='subtitle2'>{key}</Typography>
            <Typography>{value || 'No Data'}</Typography>
          </Box>
        ))}
    </Box>
  );
};

export default DataGridUserInfo;
