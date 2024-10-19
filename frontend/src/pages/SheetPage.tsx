import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, CircularProgress, Box } from '@mui/material';
import { GridColDef, GridRowParams, GridPaginationModel } from '@mui/x-data-grid';
import { format, addDays } from 'date-fns';
import PageWrapper from '@/components/Layout/PageWrapper';
import DataGridTable from '@/components/DataGrid/DataGridTable';
import DataGridDrawer from '@/components/DataGrid/DataGridDrawer';
import fetchAPI from '@/services/apiServices';
import { GroupedData, Row } from '@/types/DataGridTypes';
import { groupDataByColumn, processSheetData } from '@/utils/DataGridUtil';

const trackingStartDate = '2024-12-09';

const SheetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const sheetId = id || 'default_sheet_id';

  const [groupedData, setGroupedData] = useState<GroupedData>({});
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const [groupColumnName, setGroupColumnName] = useState<string>('');
  const [headers, setHeaders] = useState<string[]>([]);

  const trackingDays = 21;

  const [trackingValues, setTrackingValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchAPI(`/sheets/${sheetId}`);
        if (data) {
          const sheetData = Object.values(data)[0];
          const { data: processedData, headers: uniqueHeaders } = processSheetData(sheetData);
          setHeaders(uniqueHeaders);
          const groupColIndex = 3;
          const groupColName = uniqueHeaders[groupColIndex];
          setGroupColumnName(groupColName);
          const groups = groupDataByColumn(processedData, groupColName);
          setGroupedData(groups);
          setSelectedGroup(Object.keys(groups)[0] || null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sheetId]);

  useEffect(() => {
    if (selectedRow) {
      const initialTrackingValues: { [key: string]: string } = {};
      for (let i = 0; i < trackingDays; i++) {
        const date = format(addDays(new Date(trackingStartDate), i), 'dd/MM/yyyy');
        initialTrackingValues[date] = '';
      }
      setTrackingValues(initialTrackingValues);
    }
  }, [selectedRow, trackingDays]);

  // Handle row click to open the drawer
  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row as Row);
    setDrawerOpen(true);
  };

  // Define columns based on the first 12 headers
  const columns: GridColDef[] = useMemo(() => {
    return headers.slice(0, 12).map((header) => ({
      field: header,
      headerName: header,
      flex: 1,
    }));
  }, [headers]);

  // Prepare rows for the DataGrid
  const rows: Row[] = useMemo(() => {
    if (!selectedGroup || !groupedData[selectedGroup]) {
      return [];
    }
    return groupedData[selectedGroup];
  }, [groupedData, selectedGroup]);

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  return (
    <PageWrapper>
      <Typography variant='h4' gutterBottom>
        Sheet Data (ID: {sheetId})
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box marginBottom={2}>
            {Object.keys(groupedData).map((group) => (
              <Button
                key={group}
                variant={group === selectedGroup ? 'contained' : 'outlined'}
                onClick={() => setSelectedGroup(group)}
                sx={{ marginRight: 1, marginBottom: 1 }}
                aria-pressed={group === selectedGroup}
              >
                {groupColumnName}: {group}
              </Button>
            ))}
          </Box>

          {rows.length > 0 ? (
            <DataGridTable
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              paginationModel={paginationModel}
              onPaginationModelChange={handlePaginationChange}
            />
          ) : (
            <Typography>No data available for the selected group.</Typography>
          )}

          <DataGridDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            selectedRow={selectedRow}
            headers={headers}
            trackingDays={trackingDays}
            trackingStartDate={trackingStartDate}
            trackingValues={trackingValues}
            setTrackingValues={setTrackingValues}
          />
        </>
      )}
    </PageWrapper>
  );
};

export default SheetPage;
