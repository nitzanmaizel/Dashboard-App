import { SheetData, Row, GroupedData } from '@/types/DataGridTypes';

export const processSheetData = (data: SheetData): { data: Row[]; headers: string[] } => {
  const [headersRow, ...rows] = data;

  const headerCounts: { [key: string]: number } = {};
  const headers: string[] = headersRow.map((header, idx) => {
    let headerName = header !== null ? String(header) : '';
    if (headerName === '') {
      headerName = `Column${idx}`;
    }
    if (headerCounts[headerName] !== undefined) {
      headerCounts[headerName] += 1;
      headerName = `${headerName}_${headerCounts[headerName]}`;
    } else {
      headerCounts[headerName] = 0;
    }
    return headerName;
  });

  const processedData = rows.map((row, index) => {
    const rowData: Row = { id: index };
    headers.forEach((header: string, i: number) => {
      rowData[header] = row[i] !== undefined ? row[i] : null;
    });
    return rowData;
  });

  return { data: processedData, headers };
};

export const groupDataByColumn = (data: Row[], column: string): GroupedData => {
  return data.reduce((acc: GroupedData, row: Row) => {
    const key = row[column] !== null ? String(row[column]) : '';
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});
};
