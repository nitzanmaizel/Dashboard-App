import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  cancelQueryAndGetPreviousData,
  updateQueryCache,
  rollbackQueryCache,
} from '@/utils/queryUtils';
import { AppSheetData } from '@/pages/AppSheetsPage';

export const deleteAppSheet = async (appSheetId: string): Promise<{ message: string }> => {
  const url = `/api/v1/app-sheet/${appSheetId}`;
  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete app sheet');
  }
  return response.json();
};

export const useDeleteAppSheetQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string },
    Error,
    { appSheetId: string },
    { previousAppSheets: AppSheetData[] | undefined }
  >({
    mutationFn: async ({ appSheetId }) => deleteAppSheet(appSheetId),
    onMutate: async ({ appSheetId }) => {
      const previousAppSheets = await cancelQueryAndGetPreviousData<AppSheetData[]>(queryClient, [
        'appSheets',
      ]);

      updateQueryCache<AppSheetData[]>(queryClient, ['appSheets'], (oldData) =>
        oldData?.filter((sheet) => sheet._id !== appSheetId)
      );

      return { previousAppSheets };
    },
    onError: (_err, _variables, context) => {
      rollbackQueryCache(queryClient, ['appSheets'], context?.previousAppSheets || []);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['appSheets'] });
    },
  });
};
