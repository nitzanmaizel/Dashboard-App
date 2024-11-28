import { GridRowSelectionModel } from '@mui/x-data-grid';
import { MuiColorOptions } from './MuiTypes';

export interface SmartTableProps {
  data: SmartTableData;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  actions: SmartTableActionsProps;
}

/**
 * SmartTableData Types
 */
export interface SmartTableData {
  items: SmartTableItems;
  excludeKeys?: string[];
  keysOrder?: string[];
  keysTranslation?: Record<string, string>;
}

export type SmartTableItems = { _id: string; [k: string]: unknown }[];

/**
 * SmartTableActions Types
 */
export interface SmartTableActionsProps {
  onSelect: (selectedRows: GridRowSelectionModel) => void;
  onDelete: (selectedRows: GridRowSelectionModel) => void;
  onEdit: (selectedRows: GridRowSelectionModel) => void;
  onAdd: () => void;
  onExport: () => void;
  onDownload: () => void;
  onSearch?: (searchValue: string) => void;
}

/**
 * SmartTableActionButton Types
 */
export type ActionButtonType = {
  color: MuiColorOptions;
  text: string;
  onClick?: () => void;
  badgeContent?: React.ReactNode;
  role?: string;
};
