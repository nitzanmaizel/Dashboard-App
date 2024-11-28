import { SmartTableData } from '@/types/SmartTableTypes';
import { GridColDef } from '@mui/x-data-grid';

export const generateColumns = (data: SmartTableData): GridColDef[] => {
  if (!data.items || data.items.length === 0) return [];

  const { items, excludeKeys = [], keysOrder = [], keysTranslation = {} } = data;

  const sample = items[0];
  const allKeys = Object.keys(sample).filter((key) => !excludeKeys.includes(key));

  const orderedKeys = [
    ...keysOrder.filter((key) => allKeys.includes(key)),
    ...allKeys.filter((key) => !keysOrder.includes(key)),
  ];

  return orderedKeys.map((key) => ({
    field: key,
    headerName: keysTranslation[key] || key.charAt(0).toUpperCase() + key.slice(1),
    flex: 1,
  }));
};
