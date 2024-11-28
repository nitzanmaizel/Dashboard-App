import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import fetchAPI from './apiServices';
import { RIUsersType, UserData } from '@/types/UserTypes';
import { useSnackbar } from '@/hooks/useSnackbar';

const emptyUsersData: RIUsersType = { users: [], total: 0, limit: 0, page: 0 };

export function useUsersQuery() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { users, total, limit, page } = await fetchAPI<RIUsersType>('/user');
      return { users, total, limit, page };
    },
  });
}

export function useCreateUserMutation() {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<
    UserData,
    Error,
    Partial<UserData>,
    { previousData: RIUsersType; tempId: string }
  >({
    mutationFn: async (newUser) => {
      return await fetchAPI<UserData>('/user', { method: 'POST', body: { newUser } });
    },
    onMutate: async (newUser) => {
      const { previousData, previousUsers } = await cancelAndGetPreviousUsersData(queryClient);

      const tempId = Date.now().toString();
      const optimisticUser: UserData = { ...newUser, id: Number(tempId) } as UserData;

      queryClient.setQueryData(['users'], {
        ...previousData,
        users: [...previousUsers, optimisticUser],
      });

      return { previousData, tempId };
    },
    onError: (error, _newUser, context) => {
      queryClient.setQueryData(['users'], context?.previousData);
      showSnackbar(`Error creating user: ${error.message}`, 'error');
    },
    onSuccess: (createdUser, _newUser, context) => {
      const previousData = context?.previousData;
      if (previousData) {
        queryClient.setQueryData(['users'], {
          ...previousData,
          users: [...previousData.users, createdUser],
        });
      }
      showSnackbar('User created successfully');
    },
  });
}

export function useUserQuery(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const user = await fetchAPI<UserData>(`/user/profile`);
      return user;
    },
  });
}

export function useUpdateUserMutation() {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<UserData, Error, UserData, { previousData: RIUsersType }>({
    mutationFn: async (updatedUser) => {
      return await fetchAPI<UserData>(`/user/${updatedUser.id}`, {
        method: 'PUT',
        body: { updatedUser },
      });
    },
    onMutate: async (updatedUser) => {
      const { previousData, previousUsers } = await cancelAndGetPreviousUsersData(queryClient);

      queryClient.setQueryData(['users'], {
        ...previousData,
        users: previousUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      });

      return { previousData };
    },
    onError: (_error, _updatedUser, context) => {
      queryClient.setQueryData(['users'], context?.previousData);
      showSnackbar('Error updating user', 'error');
    },
    onSuccess: (_createdUser, updatedUser, context) => {
      const previousData = context?.previousData;
      if (previousData) {
        const updatedUsers = previousData.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        queryClient.setQueryData(['users'], { ...previousData, users: updatedUsers });
      }
      showSnackbar('User edited successfully');
    },
  });
}

export function useDeleteUserMutation() {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, { previousData: RIUsersType }>({
    mutationFn: async (id) => {
      await fetchAPI(`/user/${id}`, { method: 'DELETE' });
    },
    onMutate: async (id) => {
      const { previousData, previousUsers } = await cancelAndGetPreviousUsersData(queryClient);

      queryClient.setQueryData(['users'], {
        ...previousData,
        users: previousUsers.filter((user) => user.id !== Number(id)),
      });

      return { previousData };
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(['users'], context?.previousData);
      showSnackbar('Error deleting user', 'error');
    },
    onSuccess: () => {
      showSnackbar('User deleted successfully');
    },
  });
}

async function cancelAndGetPreviousUsersData(
  queryClient: QueryClient
): Promise<{ previousData: RIUsersType; previousUsers: UserData[] }> {
  await queryClient.cancelQueries({ queryKey: ['users'] });
  const previousData = queryClient.getQueryData<RIUsersType>(['users']) || emptyUsersData;
  const previousUsers = previousData.users;
  return { previousData, previousUsers };
}
