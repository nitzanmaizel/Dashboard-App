import React from 'react';
import { Badge, Button } from '@mui/material';
import styled from '@emotion/styled';
import SearchBar from '../Inputs/SearchBar';
import { FlexRow, FlexRowSpaceBetween } from '@/styles/Flex';
import { ActionButtonType } from '@/types/SmartTableTypes';

const SmartTableActions: React.FC<{ actions: ActionButtonType[] }> = ({ actions }) => {
  return (
    <FlexRowSpaceBetween p={'0 10px'} minHeight={70}>
      <SearchBar />
      <FlexRow display={'flex'} gap={2}>
        {actions.map(({ text, onClick, color, badgeContent }, index) => (
          <ActionBadge key={index} color={color} badgeContent={badgeContent}>
            <Button variant='outlined' color={color} onClick={onClick}>
              {text}
            </Button>
          </ActionBadge>
        ))}
      </FlexRow>
    </FlexRowSpaceBetween>
  );
};

export default SmartTableActions;

const ActionBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    color: '#fff',
    right: 5,
    top: 5,
    border: `2px solid #fff`,
    padding: '0 4px',
  },
});
