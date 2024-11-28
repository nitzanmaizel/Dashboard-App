import AppSheetCard from '@/components/Cards/AppSheetCard';
import PageWrapper from '@/components/Layout/PageWrapper';
import { useAppSheetsRawQuery } from '@/services/appSheetServices/useAppSheetQuery';
import { Box } from '@mui/material';
import React from 'react';

export interface AppSheetData {
  _id?: string;
  title: string;
  description: string;
  additionalData: { key: string; value: string }[];
  createdAt?: string;
  updatedAt?: string;
}

const AppSheetsPage: React.FC = () => {
  const appSheetsQuery = useAppSheetsRawQuery();

  const { data: appSheets, isError, isLoading } = appSheetsQuery;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <PageWrapper title={'מסמכים'}>
      <Box display={'flex'} flexWrap={'wrap'} gap={3}>
        {appSheets?.length &&
          appSheets.map((appSheet: AppSheetData) => (
            <AppSheetCard key={appSheet._id} {...appSheet} />
          ))}
      </Box>
    </PageWrapper>
  );
};

export default AppSheetsPage;
