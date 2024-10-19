// components/TabsPanel.tsx

import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Button } from '@mui/material';
import { Row } from '@/types/DataGridTypes';
import DataGridUserInfo from './DataGridUserInfo';
import DateGridControllers from './DataGridController';

interface TabsPanelProps {
  selectedRow: Row;
  headers: string[];
  trackingDays: number;
  trackingStartDate: string;
  trackingValues: { [key: string]: string };
  setTrackingValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  validationErrors: { [key: string]: string };
  setValidationErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  handleSave: () => void;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
}

const TabsPanel: React.FC<TabsPanelProps> = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    selectedRow,
    headers,
    trackingDays,
    trackingStartDate,
    trackingValues,
    setTrackingValues,
    validationErrors,
    setValidationErrors,
    handleSave,
    saveStatus,
  } = props;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label={'מידע אישי'} />
        <Tab label={'ימ"מים'} />
      </Tabs>

      {activeTab === 0 && (
        <Box p={2}>
          <Typography variant='h6' gutterBottom>
            Details for {selectedRow[headers[0]]}
          </Typography>
          <DataGridUserInfo selectedRow={selectedRow} headers={headers} />
        </Box>
      )}

      {activeTab === 1 && (
        <Box p={2}>
          <Typography variant='h6' gutterBottom>
            Day-by-Day Tracking
          </Typography>
          <DateGridControllers
            trackingDays={trackingDays}
            trackingStartDate={trackingStartDate}
            trackingValues={trackingValues}
            setTrackingValues={setTrackingValues}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />
          {saveStatus === 'success' && (
            <Typography variant='body2' color='success.main' style={{ marginTop: '8px' }}>
              Changes saved successfully!
            </Typography>
          )}
          {saveStatus === 'error' && (
            <Typography variant='body2' color='error' style={{ marginTop: '8px' }}>
              Failed to save changes. Please try again.
            </Typography>
          )}
          <Button
            variant='contained'
            color='primary'
            onClick={handleSave}
            style={{ marginTop: '16px' }}
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TabsPanel;
