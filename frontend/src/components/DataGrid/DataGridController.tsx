// components/DateControllers.tsx

import React from 'react';
import { Box, FormControl, Select, MenuItem, InputLabel, Typography } from '@mui/material';
import { format, addDays } from 'date-fns';

interface DateGridControllersProps {
  trackingDays: number;
  trackingStartDate: string;
  trackingValues: { [key: string]: string };
  setTrackingValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  validationErrors: { [key: string]: string };
  setValidationErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const DateGridControllers: React.FC<DateGridControllersProps> = ({
  trackingDays,
  trackingStartDate,
  trackingValues,
  setTrackingValues,
  validationErrors,
  setValidationErrors,
}) => {
  return (
    <Box display='grid' gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))' gap={2}>
      {Array.from({ length: trackingDays }).map((_, i) => {
        const date = addDays(new Date(trackingStartDate), i);
        const formattedDate = format(date, 'dd/MM/yyyy');
        const trackingDataValue = trackingValues[formattedDate] || '';

        return (
          <FormControl
            key={formattedDate}
            fullWidth
            variant='outlined'
            size='small'
            error={!!validationErrors[formattedDate]}
          >
            <InputLabel id={`select-label-${formattedDate}`}>{formattedDate}</InputLabel>
            <Select
              labelId={`select-label-${formattedDate}`}
              id={`select-${formattedDate}`}
              value={trackingDataValue}
              label={formattedDate}
              onChange={(e) => {
                const value = e.target.value as string;
                setTrackingValues((prev) => ({
                  ...prev,
                  [formattedDate]: value,
                }));
                setValidationErrors((prevErrors) => {
                  const rest = { ...prevErrors };
                  delete rest[formattedDate];
                  return rest;
                });
              }}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='ח/ג'>ח/ג</MenuItem>
              <MenuItem value='ש'>ש</MenuItem>
              <MenuItem value='נ'>נ</MenuItem>
            </Select>
            {validationErrors[formattedDate] && (
              <Typography variant='caption' color='error'>
                {validationErrors[formattedDate]}
              </Typography>
            )}
          </FormControl>
        );
      })}
    </Box>
  );
};

export default DateGridControllers;
