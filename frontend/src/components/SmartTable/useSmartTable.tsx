import React from 'react';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { ActionButtonType, SmartTableProps } from '@/types/SmartTableTypes';
import { generateColumns } from '@/utils/generateColumns';

const useSmartTable = ({ data, actions }: SmartTableProps) => {
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);

  const { onSelect, onDelete, onEdit, onAdd, onExport, onDownload } = actions;

  const rows = React.useMemo(() => {
    return data.items;
  }, [data]);

  const columns = React.useMemo(() => {
    return generateColumns(data);
  }, [data]);

  const handleSelectRows = (rows: GridRowSelectionModel) => {
    console.log('handleSelectRows', { rows });

    setSelectedRows(rows);
    onSelect?.(rows);
  };

  const handleDelete = () => {
    onDelete(selectedRows);
    setSelectedRows(() => []);
  };

  const handleEdit = () => {
    onEdit(selectedRows);
    setSelectedRows(() => []);
  };

  const badgeContent = selectedRows.length;

  console.log({ badgeContent, selectedRows });

  const actionButtons: ActionButtonType[] = [
    { color: 'warning', text: 'הוסף', onClick: onAdd },
    { color: 'secondary', text: 'ערוך', onClick: handleEdit, badgeContent },
    { color: 'error', text: 'מחק', onClick: handleDelete, badgeContent },
    { color: 'primary', text: 'פתח Excel', onClick: onExport },
    { color: 'success', text: 'הורד Excel', onClick: onDownload },
  ];

  return {
    rows,
    columns,
    selectedRows,
    actionButtons,
    handleSelectRows,
  };
};

export default useSmartTable;
