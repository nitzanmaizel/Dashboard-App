import { google } from 'googleapis';
import { handleError } from '../utils/errorHandler';

/**
 * Service to retrieve a Google Sheet by its ID.
 * @param {string} sheetId - The ID of the Google Sheet to retrieve.
 * @param {any} oauth2Client - The OAuth2 client used for authentication.
 * @returns {Promise<any>} - A promise that resolves to the Google Sheet data.
 */
export const getGSheetByIdService = async (sheetId: string, oauth2Client: any): Promise<any> => {
  try {
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    const response = await sheets.spreadsheets.get({ spreadsheetId: sheetId });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve Google Sheet with ID ${sheetId}: ${error.message}`);
    } else {
      throw new Error(`Failed to retrieve Google Sheet with ID ${sheetId}: ${error}`);
    }
  }
};

/**
 * Service to get all data from a Google Sheet.
 * @param {string} sheetId - The ID of the Google Sheet.
 * @param {any} auth - The OAuth2 client for authentication.
 * @returns {Promise<Object>} - A promise that resolves to the full sheet data.
 */
export const getFullSheetDataService = async (
  sheetId: string,
  auth: any
): Promise<{ [sheetName: string]: any[] }> => {
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const sheetMetadata = await sheets.spreadsheets.get({ spreadsheetId: sheetId });

    const sheetData = sheetMetadata.data.sheets;
    const fullSheetData: { [sheetName: string]: any[] } = {};

    if (sheetData && sheetData.length) {
      for (const sheet of sheetData) {
        const sheetName = sheet.properties?.title || 'Untitled Sheet';

        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: sheetId,
          range: sheetName,
        });

        const rows = response.data.values || [];
        fullSheetData[sheetName] = rows;
      }
    }

    return fullSheetData;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error retrieving data from Google Sheet:', errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Service to get metadata for a Google Sheet.
 * @param {string} sheetId - The ID of the Google Sheet.
 * @param {any} auth - The OAuth2 client for authentication.
 * @returns {Promise<Object>} - A promise that resolves to the sheet metadata.
 */
export const getSheetMetadataService = async (sheetId: string, auth: any): Promise<any> => {
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.get({ spreadsheetId: sheetId });

    return response.data.sheets;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error retrieving sheet metadata:', errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Service to get data from a specific tab (sheet) in a Google Sheet.
 * @param {string} sheetId - The ID of the Google Sheet.
 * @param {string} sheetTabName - The name of the specific sheet tab.
 * @param {any} auth - The OAuth2 client for authentication.
 * @returns {Promise<any[]>} - A promise that resolves to the tab data (rows).
 */
export const getTabDataService = async (
  sheetId: string,
  sheetTabName: string,
  auth: any
): Promise<any[]> => {
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: sheetTabName,
    });

    return response.data.values || [];
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error retrieving sheet tab data:', errorMessage);
    throw new Error(errorMessage);
  }
};
