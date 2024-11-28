import { sheets_v4 } from 'googleapis';
import { HeaderMap, IAppSheetItemData, IAppSheetSoldier } from '../types/AppSheetTypes';

export function transformAppSheetItemsToGoogleSheet(
  appSheetItems: IAppSheetItemData[],
  headerMapper: { [key: string]: string } // Added headerMapper parameter
): string[][] {
  if (appSheetItems.length === 0) return [];

  const firstItem = appSheetItems[0];
  const dataKeys = typeof firstItem.data === 'object' ? Object.keys(firstItem.data) : [];
  const additionalDataKeys = firstItem.additionalData.map((item) => item.key);

  // Combine keys from both data and additionalData
  const headerKeys = [...dataKeys, ...additionalDataKeys];

  // Apply headerMapper to transform the header keys
  const mappedHeaderKeys = headerKeys.map((key) => headerMapper[key] || key);

  // Map the rows, maintaining original values for each item
  const rows = appSheetItems.map((item) => {
    const dataValues = typeof item.data === 'object' ? Object.values(item.data) : [];
    const additionalDataValues = item.additionalData.map((item) => item.value);
    return [...dataValues, ...additionalDataValues];
  });

  // Return the header row and the data rows
  return [mappedHeaderKeys, ...rows];
}

/**
 * Reusable function to generate cell update requests for Google Sheets.
 * @param sheetId - The ID of the sheet.
 * @param startRowIndex - The starting row index for the range.
 * @param endRowIndex - The ending row index for the range.
 * @param data - The data for the range to update.
 * @param userEnteredFormat - The style to apply.
 * @param fields - The fields to update.
 * @returns The update request object for the batch update.
 */
export function generateUpdateCellsRequest(
  sheetId: number,
  startRowIndex: number,
  endRowIndex: number,
  data: string[][],
  styles: { userEnteredFormat: sheets_v4.Schema$CellFormat; fields: string }
) {
  const { userEnteredFormat, fields } = styles;
  return {
    updateCells: {
      range: {
        sheetId,
        startRowIndex,
        endRowIndex,
        startColumnIndex: 0,
        endColumnIndex: data[0].length,
      },
      rows: data.map((row) => ({
        values: row.map((cell) => ({
          userEnteredFormat,
          userEnteredValue: { stringValue: cell },
        })),
      })),
      fields,
    },
  };
}

/**
 * Applies styles to the Google Sheet, including the first row and remaining rows.
 * @param sheets - Google Sheets API instance.
 * @param spreadsheetId - The ID of the spreadsheet.
 * @param sheetId - The ID of the sheet.
 * @param data - The data to apply the styles to.
 */
export async function applyGoogleSheetStyles(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetId: number,
  data: string[][]
) {
  const requests = [];

  requests.push(
    generateUpdateCellsRequest(sheetId, 0, 1, data.slice(0, 1), googleSheetHeaderStyles)
  );

  requests.push(
    generateUpdateCellsRequest(sheetId, 1, data.length, data.slice(1), googleSheetRowStyles)
  );

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests },
  });
}

const googleSheetRowStyles = {
  userEnteredFormat: {
    textFormat: { fontSize: 11 },
    textDirection: 'RIGHT_TO_LEFT',
    horizontalAlignment: 'RIGHT',
    borders: {
      top: { style: 'SOLID', color: { red: 0, green: 0, blue: 0 } },
      bottom: { style: 'SOLID', color: { red: 0, green: 0, blue: 0 } },
      left: { style: 'SOLID', color: { red: 0, green: 0, blue: 0 } },
      right: { style: 'SOLID', color: { red: 0, green: 0, blue: 0 } },
    },
  },
  fields: 'userEnteredFormat(textFormat,borders,horizontalAlignment,textDirection)',
};

const googleSheetHeaderStyles = {
  userEnteredFormat: {
    backgroundColor: { blue: 0.827451, green: 0.91764706, red: 0.8509804 },
    textFormat: { fontSize: 11, bold: true },
    textDirection: 'LEFT_TO_RIGHT',
    horizontalAlignment: 'RIGHT',
    borders: {
      top: { style: 'SOLID', color: { red: 0, green: 0, blue: 0 } },
      bottom: { style: 'SOLID', color: { red: 0, green: 0, blue: 0 } },
      left: { style: 'SOLID', color: { red: 0, green: 0, blue: 0 } },
      right: { style: 'SOLID', color: { red: 0, green: 0, blue: 0 } },
    },
  },
  fields: 'userEnteredFormat(backgroundColor,textFormat,borders,horizontalAlignment,textDirection)',
};

export const headerUserMap: HeaderMap<IAppSheetSoldier> = {
  'שם משפחה': 'lastName',
  'שם פרטי': 'firstName',
  'מספר אישי': 'personalNumber',
  פלוגה: 'company',
  מחלקה: 'department',
  'פק"ל': 'equipment',
  טלפון: 'phone',
  הערות: 'notes',
};

export const GoogleSheetUsersMap = {
  lastName: 'שם משפחה',
  firstName: 'שם פרטי',
  personalNumber: 'מספר אישי',
  company: 'פלוגה',
  department: 'מחלקה',
  equipment: 'פק"ל',
  phone: 'טלפון',
  notes: 'הערות',
};
