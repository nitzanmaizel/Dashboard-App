import React from 'react';
import { useParams } from 'react-router-dom';

import PageWrapper from '@/components/Layout/PageWrapper';
import SmartTable from '@/components/SmartTable/SmartTable';
// import SheetItemInfoModal from '@/components/Modals/SheetItemInfoModal';

import { useAppSheet } from '@/hooks/useAppSheet';
import { useAppSheetQuery } from '@/services/appSheetServices/useAppSheetQuery';

const AppSheetDataPage: React.FC = () => {
  const { appSheetId = '' } = useParams<{ appSheetId: string }>();
  const { data: appSheetData, isError, isLoading, error } = useAppSheetQuery(appSheetId);

  const { smartTableData } = useAppSheet(appSheetData);

  const { title, description } = appSheetData;
  const breadcrumbs = [
    { title: 'בית', to: '/' },
    { title: title, to: `/app-sheet/${appSheetId}` },
  ];

  return (
    <PageWrapper title={title} description={description} breadcrumbs={breadcrumbs}>
      <SmartTable
        data={smartTableData}
        isLoading={isLoading}
        isError={isError}
        error={error}
        actions={smartTableData.actions}
      />

      {/* {selectedRow && (
        <SheetItemInfoModal
          open={openModal}
          onClose={handleClose}
          sheetItemInfo={selectedRow}
          onSave={handleSave}
        />
      )} */}
    </PageWrapper>
  );
};

export default AppSheetDataPage;
