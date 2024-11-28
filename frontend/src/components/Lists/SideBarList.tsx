import React from 'react';
import {
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  SvgIconOwnProps,
} from '@mui/material';
import { Link } from 'react-router-dom';
import IconWrapper from '../IconWrapper/IconWrapper';
import { FlexRow } from '@/styles/Flex';

const SidebarList: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <List sx={{ width: '100%' }}>
      {sidebarData.map((header, index) => (
        <Accordion key={index} disableGutters expanded>
          <AccordionSummary>
            <FlexRow flex={1} justifyContent={open ? 'start' : 'center'}>
              <IconWrapper type={header.icon.type} fontSize='large' color={header.icon.color} />
              {open && (
                <Typography
                  variant='h6'
                  color={header.icon.color}
                  sx={{ opacity: 0.5, marginLeft: 1 }}
                >
                  {header.title}
                </Typography>
              )}
            </FlexRow>
          </AccordionSummary>
          {open && (
            <AccordionDetails>
              <List>
                {header.links.map(({ label, to }, linkIndex) => (
                  <ListItem key={linkIndex} component={Link} to={to}>
                    <Typography variant='subtitle1'>{label}</Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </List>
  );
};

export default SidebarList;

interface SidebarData {
  title: string;
  links: { label: string; to: string }[];
  icon: { type: string; color: SvgIconOwnProps['color'] };
}

const sidebarData: SidebarData[] = [
  {
    title: 'מסמכים',
    links: [
      { label: 'תע"מ 24', to: '/app-sheet/6743f8fa0e9547e99d39e85d' },
      { label: 'תע"מ 25', to: '/app-sheet/6743fa1c0e9547e99d39e912' },
      { label: 'תע"מ 2 בדיקה', to: '/app-sheet/6743fb760e9547e99d39e9ad' },
      { label: 'צור  מסמך חדש +', to: '/app-sheet/create' },
    ],
    icon: {
      type: 'doc',
      color: 'success',
    },
  },
  {
    title: 'מאגרי מידע',
    links: [
      { label: 'חיילים', to: '/link2-1' },
      { label: 'נשקים', to: '/link2-2' },
      { label: 'תווים', to: '/link2-2' },
      { label: 'צור מאגר חדש +', to: '/app-sheet/create' },
    ],
    icon: {
      type: 'database',
      color: 'primary',
    },
  },
  {
    title: 'משתמשים',
    links: [
      { label: 'ניהול משתמשים', to: '/dashboard/users' },
      { label: 'Link 3-2', to: '/link3-2' },
      { label: 'Link 3-3', to: '/link3-3' },
    ],
    icon: {
      type: 'users',
      color: 'warning',
    },
  },
  {
    title: 'אנליטיקה',
    links: [
      { label: 'Link 4-1', to: '/link4-1' },
      { label: 'Link 4-2', to: '/link4-2' },
      { label: 'Link 4-3', to: '/link4-3' },
    ],
    icon: {
      type: 'analytics',
      color: 'secondary',
    },
  },
];
