// components/DataGridDrawer.tsx

import React, { useState } from 'react';
import { Drawer, Typography, styled } from '@mui/material';
import { Row } from '@/types/DataGridTypes';
import TabsPanel from './TabsPanel';
import { parse, subDays, addDays, startOfDay, isWithinInterval } from 'date-fns';

interface DataGridDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedRow: Row | null;
  headers: string[];
  trackingDays: number;
  trackingStartDate: string;
  trackingValues: { [key: string]: string };
  setTrackingValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  // updateRowData: (updatedRow: Row) => void;
}

const DrawerContent = styled('div')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  overflowY: 'auto',
}));

const DataGridDrawer: React.FC<DataGridDrawerProps> = ({
  open,
  onClose,
  selectedRow,
  headers,
  trackingDays,
  trackingStartDate,
  trackingValues,
  setTrackingValues,
  // updateRowData,
}) => {
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Calculate allowed date range
  const currentDate = startOfDay(new Date());
  const allowedStartDate = subDays(currentDate, 7);
  const allowedEndDate = addDays(currentDate, 7);

  const handleSave = async () => {
    // Validation
    const errors: { [key: string]: string } = {};

    Object.entries(trackingValues).forEach(([dateString, value]) => {
      const date = parse(dateString, 'dd/MM/yyyy', new Date());
      const isEditable = isWithinInterval(date, {
        start: allowedStartDate,
        end: allowedEndDate,
      });

      if (isEditable && !value) {
        errors[dateString] = 'Please select a value';
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setSaveStatus('saving');
    try {
      // Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the main data grid
      const updatedRow = {
        ...selectedRow,
        ...trackingValues,
      };

      console.log({ updatedRow });

      // updateRowData(updatedRow as Row);

      setSaveStatus('success');
      onClose();
    } catch {
      setSaveStatus('error');
    }
  };

  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          maxHeight: '80vh',
        },
      }}
    >
      <DrawerContent>
        {selectedRow ? (
          <TabsPanel
            selectedRow={selectedRow}
            headers={headers}
            trackingDays={trackingDays}
            trackingStartDate={trackingStartDate}
            trackingValues={trackingValues}
            setTrackingValues={setTrackingValues}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
            handleSave={handleSave}
            saveStatus={saveStatus}
            allowedStartDate={allowedStartDate}
            allowedEndDate={allowedEndDate}
          />
        ) : (
          <Typography>No data available</Typography>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default DataGridDrawer;
