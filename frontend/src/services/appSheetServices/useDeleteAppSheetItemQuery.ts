import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchAPI from '../apiServices';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { IAppSheet } from '@/types/AppSheetTypes';

type RDeleteItemsQuery = {
  message: string;
  deletedCount: number;
};

/**
 * API call to delete multiple items from an AppSheet.
 */
export const deleteItemsFromAppSheet = async (
  appSheetId: string,
  itemIds: GridRowSelectionModel
): Promise<RDeleteItemsQuery> => {
  try {
    if (!appSheetId || itemIds.length === 0) {
      return { message: !appSheetId ? 'No appSheetId' : 'No items to delete', deletedCount: 0 };
    }
    const url = `/app-sheet/${appSheetId}/items`;
    const res: RDeleteItemsQuery = await fetchAPI(url, { method: 'DELETE', body: { itemIds } });

    return { message: res.message, deletedCount: res.deletedCount };
  } catch (error) {
    console.log('Error deleting items', error);
    return { message: 'Error deleting items', deletedCount: 0 };
  }
};

/**
 * React Query hook to delete multiple items from an AppSheet.
 */
export const useDeleteItemsFromAppSheetQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; deletedCount: number },
    Error,
    { appSheetId: string; itemIds: GridRowSelectionModel },
    { previousAppSheet: IAppSheet | undefined }
  >({
    mutationFn: async ({ appSheetId, itemIds }) => deleteItemsFromAppSheet(appSheetId, itemIds),
    onMutate: async ({ appSheetId, itemIds }) => {
      await queryClient.cancelQueries({ queryKey: ['app-sheet', appSheetId] });

      const previousAppSheet = queryClient.getQueryData<IAppSheet>(['app-sheet', appSheetId]);

      queryClient.setQueryData<IAppSheet>(['app-sheet', appSheetId], (oldData) => {
        if (!oldData) return;

        const newItems = oldData.appSheetItems.filter((item) => !itemIds.includes(item._id));
        return { ...oldData, appSheetItems: newItems };
      });

      return { previousAppSheet };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousAppSheet) {
        queryClient.setQueryData(['app-sheet'], context.previousAppSheet);
      }
    },
    onSettled: (_data, _error, { appSheetId }) => {
      queryClient.invalidateQueries({ queryKey: ['app-sheet', appSheetId] });
    },
  });
};
