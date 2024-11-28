import { useQuery } from '@tanstack/react-query';
import fetchAPI from '@/services/apiServices';
import { AppSheetItemInfo, IAppSheet } from '@/types/AppSheetTypes';

const defaultAppSheetData = { _id: '', title: '', description: '', appSheetItems: [] };

export interface IAppSheetRawData {
  _id?: string;
  title: string;
  description: string;
  type: string;
  additionalData: { key: string; value: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export function useAppSheetQuery(appSheetId: string) {
  return useQuery<IAppSheet, Error>({
    queryKey: ['app-sheet', appSheetId],
    queryFn: async (): Promise<IAppSheet> => {
      const response = await fetchAPI<{ sheetData: IAppSheet }>(`/app-sheet/${appSheetId}/data`);
      return response.sheetData ?? defaultAppSheetData;
    },
    enabled: !!appSheetId,
    initialData: defaultAppSheetData,
  });
}

export function useAppSheetsRawQuery() {
  return useQuery<IAppSheetRawData[]>({
    queryKey: ['app-sheets'],
    queryFn: async () => {
      const appSheetsRaw = await fetchAPI<IAppSheetRawData[]>('/app-sheet');
      return appSheetsRaw || [];
    },
  });
}

export function useAppSheetCollection(appSheetCollection: string) {
  return useQuery({
    queryKey: ['app-sheet-collection'],
    queryFn: async () => {
      const appSheetCollections = await fetchAPI<AppSheetItemInfo[]>(
        `/app-sheet/collection/${appSheetCollection}`
      );
      return appSheetCollections || [];
    },
  });
}
