// components/DateControllers.tsx

import React from 'react';
import { Box, FormControl, Select, MenuItem, InputLabel, Typography } from '@mui/material';
import { format, addDays, isWithinInterval, parseISO, startOfDay } from 'date-fns';

interface DateControllersProps {
  trackingDays: number;
  trackingStartDate: string;
  trackingValues: { [key: string]: string };
  setTrackingValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  validationErrors: { [key: string]: string };
  setValidationErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  allowedStartDate: Date;
  allowedEndDate: Date;
}

const DateControllers: React.FC<DateControllersProps> = ({
  trackingDays,
  trackingStartDate,
  trackingValues,
  setTrackingValues,
  validationErrors,
  setValidationErrors,
  allowedStartDate,
  allowedEndDate,
}) => {
  return (
    <Box display='grid' gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))' gap={2}>
      {Array.from({ length: trackingDays }).map((_, i) => {
        const date = addDays(parseISO(trackingStartDate), i);
        const formattedDate = format(date, 'dd/MM/yyyy');
        const trackingDataValue = trackingValues[formattedDate] || '';

        // Check if date is within allowed range
        const isEditable = isWithinInterval(startOfDay(date), {
          start: allowedStartDate,
          end: allowedEndDate,
        });

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
                // Remove error if any
                setValidationErrors((prevErrors) => {
                  const rest = { ...prevErrors };
                  delete rest[formattedDate];
                  return rest;
                });
              }}
              disabled={!isEditable} // Disable input if date is not editable
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
            {!isEditable && (
              <Typography variant='caption' color='textSecondary'>
                Date not editable
              </Typography>
            )}
          </FormControl>
        );
      })}
    </Box>
  );
};

export default DateControllers;
