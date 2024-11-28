import { useCallback, useState } from 'react';
import { GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';

import { AppSheetItem, IAppSheet } from '@/types/AppSheetTypes';
import { useDeleteItemsFromAppSheetQuery } from '@/services/appSheetServices/useDeleteAppSheetItemQuery';

export const useAppSheet = (appSheetData: IAppSheet) => {
  const [openModal, setOpenModal] = useState(false);
  console.log({ openModal });

  const { mutate: deleteItems } = useDeleteItemsFromAppSheetQuery();

  const { appSheetItems } = appSheetData;

  const getAppSheetItemById = useCallback(
    (itemId: GridRowId): AppSheetItem | undefined => {
      return appSheetItems.find((item) => item.itemId === itemId);
    },
    [appSheetItems]
  );

  const handleEditItems = (selectedRows: GridRowSelectionModel) => {
    const items = selectedRows.map((row) => getAppSheetItemById(row));
    console.log('handleEditItems', { items });
  };

  const handleDeleteItems = (selectedRows: GridRowSelectionModel) => {
    deleteItems({ appSheetId: appSheetData._id, itemIds: selectedRows });
  };

  const handleAddItem = () => {
    console.log('handleAddItem');
  };
  const handleExportAppSheet = () => {
    console.log('handleExportAppSheet');
  };
  const handleDownloadAppSheet = () => {
    console.log('handleDownloadAppSheet');
  };

  const handleSelectRows = (rows: GridRowSelectionModel) => {
    console.log('handleSelectRows', { rows });
  };

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  const itemsWithoutAdditionalData = appSheetItems.map((entry) => {
    return { ...entry.data, id: entry._id };
  });

  const smartTableData = {
    items: itemsWithoutAdditionalData,
    excludeKeys: EXCLUDE_KEYS,
    keysOrder: USER_KEYS_ORDER,
    keysTranslation: HEADER_MAPPING,
    actions: {
      onSelect: handleSelectRows,
      onDelete: handleDeleteItems,
      onEdit: handleEditItems,
      onAdd: handleAddItem,
      onExport: handleExportAppSheet,
      onDownload: handleDownloadAppSheet,
    },
  };

  return {
    smartTableData,
    handleClose,
  };
};

const USER_KEYS_ORDER = [
  'lastName',
  'firstName',
  'personalNumber',
  'company',
  'department',
  'phone',
  'equipment',
  'notes',
];

const HEADER_MAPPING: Record<string, string> = {
  lastName: 'שם משפחה',
  firstName: 'שם פרטי',
  personalNumber: 'מספר אישי',
  company: 'פלוגה',
  department: 'מחלקה',
  phone: 'טלפון',
  notes: 'הערות',
  equipment: 'פק"ל',
};

const EXCLUDE_KEYS = ['additionalData', '__v', 'createdAt', '_id'];
