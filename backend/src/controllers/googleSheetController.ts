import { Request, Response, NextFunction } from 'express';
import AppSheetSoldier from '../models/AppSheetSoldierModal';
import {
  createGoogleSheetService,
  getGoogleSheetService,
  updateGoogleSheetDataService,
  loadGoogleSheetToDB,
} from '../services/googleSheetServices';
import { getAppSheetByIdService } from '../services/appSheetServices';
import {
  GoogleSheetUsersMap,
  headerUserMap,
  transformAppSheetItemsToGoogleSheet,
} from '../utils/googleSheetUtils';
import { google, sheets_v4 } from 'googleapis';

export const loadGoogleSheetController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { googleSheetId, tabName = 'תע"מ 2024' } = req.params;

  const auth = req.oauth2Client;

  try {
    const sheetData = await getGoogleSheetService(googleSheetId, tabName, auth);
    if (!sheetData) {
      res.status(404).json({ message: 'No sheets found in the Google Sheet.' });
      return;
    }

    await loadGoogleSheetToDB(sheetData, AppSheetSoldier, headerUserMap);

    res.status(200).send(sheetData);
  } catch (error) {
    console.error('Error retrieving full sheet data:', error);
    next(error);
  }
};

export const createGoogleSheetController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { appSheetId } = req.params;
    const auth = req.oauth2Client;

    const appSheetData = await getAppSheetByIdService(appSheetId);

    const { appSheetItems, title } = appSheetData;

    const googleSheetRawData = transformAppSheetItemsToGoogleSheet(
      appSheetItems,
      GoogleSheetUsersMap
    );

    const googleSheetUrl = await createGoogleSheetService(title, googleSheetRawData, auth);

    res.status(200).json({ appSheetData, googleSheetRawData, googleSheetUrl });
  } catch (error) {
    console.error('Error creating Google Sheet:', error);
    next(error);
  }
};

export const updateGoogleSheetController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { googleSheetId: spreadsheetId } = req.params;
  const data = req.body;
  const auth = req.oauth2Client;

  try {
    const sheets: sheets_v4.Sheets = google.sheets({ version: 'v4', auth });

    await updateGoogleSheetDataService(sheets, spreadsheetId, data);

    res.status(200).json({ message: 'Google Sheet updated successfully.' });
  } catch (error) {
    console.error('Error updating Google Sheet:', error);
    next(error);
  }
};
