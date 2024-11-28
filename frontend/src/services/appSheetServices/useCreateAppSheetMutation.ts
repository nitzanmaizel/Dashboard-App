import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchAPI from '@/services/apiServices';
import { IAppSheet, NewSheetData } from '@/types/AppSheetTypes';

async function createAppSheet(newSheetData: NewSheetData): Promise<IAppSheet> {
  const sheet = await fetchAPI<IAppSheet, NewSheetData>('/app-sheet', {
    method: 'POST',
    body: newSheetData,
  });
  return sheet;
}

export function useCreateAppSheetMutation() {
  const queryClient = useQueryClient();

  return useMutation<IAppSheet, Error, NewSheetData>({
    mutationFn: createAppSheet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['app-sheet'] });
    },
  });
}
