import React from 'react';
import useSmartTable from './useSmartTable';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { SmartTableProps } from '@/types/SmartTableTypes';
import SmartTableActions from './SmartTableActions';

const SmartTable: React.FC<SmartTableProps> = ({ data, isLoading, isError, error, actions }) => {
  const { rows, columns, selectedRows, handleSelectRows, actionButtons } = useSmartTable({
    data,
    actions,
  });

  if (isLoading) {
    return <Box>{isLoading && renderLoading()}</Box>;
  }

  if (isError && error) {
    return <Box>{renderError(error)}</Box>;
  }

  if ((!isLoading && !rows.length) || (!isLoading && !columns.length)) {
    return <Box>{renderNoData()}</Box>;
  }

  return (
    <Card>
      <SmartTableActions actions={actionButtons} />

      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableRowSelectionOnClick
        checkboxSelection
        onRowSelectionModelChange={handleSelectRows}
        rowSelectionModel={selectedRows}
      />
    </Card>
  );
};

export default SmartTable;

const renderError = (error: Error) => {
  return (
    <Typography color='error' variant='h6' align='center' mt={4}>
      Error fetching sheet data: {error?.message || 'Unknown error'}
    </Typography>
  );
};

const renderNoData = () => {
  return <Typography variant='h6'>No data found for this sheet.</Typography>;
};

const renderLoading = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <CircularProgress />
      <Typography variant='body1' mt={2}>
        Loading sheet data...
      </Typography>
    </Box>
  );
};
