import React from 'react';
import PageWrapper from '@/components/Layout/PageWrapper';
import { UserData } from '@/types/UserTypes';
import fetchAPI from '@/services/apiServices';
import { generateColumns } from '@/utils/generateColumns';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

const UsersPage: React.FC = () => {
  const [adminUsers, setAdminUsers] = React.useState<UserData[] | []>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserData | null>(null);

  React.useEffect(() => {
    const getAllUsers = async () => {
      const users: UserData[] = await fetchAPI('/admin-user');
      setAdminUsers(users || []);
    };

    getAllUsers();
  }, []);

  const handleRowClick = React.useCallback(
    (params: GridRowParams) => {
      const rowId = params.id as number;
      const entry: UserData | undefined = adminUsers.find((entry) => entry._id === rowId);

      if (entry) {
        setSelectedUser(entry);
        setOpenModal(true);
      }
    },
    [adminUsers]
  );

  const rows = React.useMemo(() => {
    return adminUsers.map((entry) => ({
      ...entry,
      id: entry._id ? entry._id : new Date().getTime().toString(),
    }));
  }, [adminUsers]);

  const columns = React.useMemo(() => {
    const appSheetItemsInfo = adminUsers.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
    }));
    return generateColumns(appSheetItemsInfo, ['_id'], USER_KEYS_ORDER, HEADER_MAPPING);
  }, [adminUsers]);

  console.log({ adminUsers, rows, columns, openModal, selectedUser });

  const createAdminUser = async (personalNumber: string) => {
    const data = await fetchAPI(`/admin-user/${personalNumber}`, {
      method: 'POST',
      body: { email: 'test@gmail.com' },
    });
    console.log({ data });
  };

  return (
    <PageWrapper title={'רשימת משתמשים'}>
      <Box>
        <Button variant='contained' color='primary' onClick={() => createAdminUser('8408057')}>
          הוסף משתמש
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        checkboxSelection
        disableRowSelectionOnClick
        onRowClick={handleRowClick}
      />
    </PageWrapper>
  );
};

export default UsersPage;

const USER_KEYS_ORDER = [
  'lastName',
  'firstName',
  'personalNumber',
  'email',
  'role',
  'company',
  'department',
  'phone',
];

const HEADER_MAPPING: Record<string, string> = {
  lastName: 'שם משפחה',
  firstName: 'שם פרטי',
  personalNumber: 'מספר אישי',
  email: 'אימייל',
  role: 'תפקיד',
  company: 'פלוגה',
  department: 'מחלקה',
  phone: 'טלפון',
};
