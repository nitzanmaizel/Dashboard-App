import { google } from 'googleapis';

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
