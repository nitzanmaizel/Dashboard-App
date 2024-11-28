import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { AdditionalData, AppSheetItem } from '@/types/AppSheetTypes';

interface SheetItemInfoModalProps {
  open: boolean;
  onClose: () => void;
  sheetItemInfo: AppSheetItem;
  onSave: (updatedAdditionalData: AdditionalData) => void;
}

const SheetItemInfoModal: React.FC<SheetItemInfoModalProps> = ({
  open,
  onClose,
  sheetItemInfo,
  onSave,
}) => {
  const { data, additionalData } = sheetItemInfo;

  const [editableAdditionalData, setEditableAdditionalData] =
    useState<AdditionalData>(additionalData);

  const handleChange = (key: string, field: 'key' | 'value', value: string) => {
    const updatedData = editableAdditionalData.map((entry) =>
      entry.key === key ? { ...entry, [field]: value } : entry
    );

    setEditableAdditionalData(updatedData);
  };

  const handleSaveClick = () => {
    onSave(editableAdditionalData);
  };

  const dateEntries = editableAdditionalData.filter((entry) => isValidDate(entry.key));
  const stringEntries = editableAdditionalData.filter((entry) => !isValidDate(entry.key));

  const entries = [
    { title: 'נתונים נוספים', data: stringEntries, label: 'עמודה' },
    { title: 'דו"ח 1', data: dateEntries, label: 'תאריך' },
  ];

  return (
    <Drawer anchor='bottom' open={open} onClose={onClose} sx={{ minHeight: '70vh' }}>
      <DrawerContent>
        <Box display='flex' gap={2} mb={2} borderBottom={'1px solid #000'}>
          <Typography variant='h6'>{`שם פרטי: ${data.firstName}`}</Typography>
          <Typography variant='h6'>{`שם משפחה: ${data.lastName}`}</Typography>
          <Typography variant='h6'>{`מספר אישי: ${data.personalNumber}`}</Typography>
        </Box>

        <AdditionalSheetItemData entries={entries} handleChange={handleChange} />

        <Box mt={2} display='flex' justifyContent='flex-end'>
          <Button onClick={onClose} style={{ marginRight: '8px' }}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSaveClick}>
            Save
          </Button>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default SheetItemInfoModal;

const DrawerContent = styled('div')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  overflowY: 'auto',
  minHeight: '70vh',
}));

const isValidDate = (dateString: string) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(dateString);
};

interface AdditionalSheetItemDataProps {
  entries: {
    title: string;
    data: { key: string; value: string }[];
    label: string;
  }[];
  handleChange: (key: string, field: 'key' | 'value', value: string) => void;
}

const AdditionalSheetItemData = ({ entries, handleChange }: AdditionalSheetItemDataProps) => {
  return (
    <Box sx={{ maxHeight: '50vh', overflow: 'auto' }}>
      {entries.map((entry) => (
        <Box key={entry.title} mb={2}>
          <Typography variant='h6' mb={2}>
            {entry.title}
          </Typography>
          <Box display={'flex'} gap={3} flexWrap={'wrap'}>
            {entry.data.map((entryData) => (
              <Box display='flex' alignItems='center' gap={1} maxWidth={'15%'} key={entryData.key}>
                <TextField
                  label={entry.label}
                  value={entryData.key}
                  variant='outlined'
                  size='small'
                />
                {isValidDate(entryData.key) ? (
                  <Select
                    label='Value'
                    value={entryData.value ? entryData.value : '0'}
                    onChange={(e) => handleChange(entryData.key, 'value', e.target.value)}
                    variant='outlined'
                    size='small'
                  >
                    <MenuItem value='1'>{'1'}</MenuItem>
                    <MenuItem value='0'>{'0'}</MenuItem>
                    <MenuItem value='ח'>{'ח'}</MenuItem>
                    <MenuItem value='ש'>{'ש'}</MenuItem>
                  </Select>
                ) : (
                  <TextField
                    label='Value'
                    value={entryData.value}
                    onChange={(e) => handleChange(entryData.key, 'value', e.target.value)} // Handle TextField change event
                    variant='outlined'
                    size='small'
                    sx={{}}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
