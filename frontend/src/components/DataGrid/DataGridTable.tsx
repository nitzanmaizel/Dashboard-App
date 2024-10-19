import React from 'react';
import { DataGrid, GridColDef, GridRowParams, GridPaginationModel } from '@mui/x-data-grid';
import { Row } from '@/types/DataGridTypes';

interface DataGridTableProps {
  rows: Row[];
  columns: GridColDef[];
  paginationModel: GridPaginationModel;
  onRowClick: (params: GridRowParams) => void;
  onPaginationModelChange: (model: GridPaginationModel) => void;
}

const DataGridTable: React.FC<DataGridTableProps> = ({
  rows,
  columns,
  paginationModel,
  onRowClick,
  onPaginationModelChange,
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      onRowClick={onRowClick}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      pageSizeOptions={[5, 10, 20]}
    />
  );
};

export default DataGridTable;
