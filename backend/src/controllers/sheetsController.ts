import { Request, Response, NextFunction } from 'express';
import {
  getGSheetByIdService,
  getSheetMetadataService,
  getTabDataService,
} from '../services/sheetServices';

/**
 * Controller to handle the request for retrieving a Google Sheet by ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const getGSheetByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id: sheetId } = req.params;

    const sheetData = await getGSheetByIdService(sheetId, req.oauth2Client);

    res.status(200).json({
      message: `Google Sheet with ID ${sheetId} retrieved successfully.`,
      data: sheetData,
    });
  } catch (error) {
    console.error('Error retrieving the Google Sheet:', error);
    next(error);
  }
};

/**
 * Controller to get all data from a Google Sheet, including all tabs.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const getFullSheetDataController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { sheetId } = req.params;
  const auth = req.oauth2Client;

  try {
    const sheetMetadata = await getSheetMetadataService(sheetId, auth);

    const fullSheetData: { [sheetTabName: string]: any[] } = {};

    if (sheetMetadata && sheetMetadata.length) {
      for (const sheet of sheetMetadata) {
        const sheetTabName = sheet.properties?.title || 'Untitled Sheet';

        // Get values from this sheet tab
        const tabData = await getTabDataService(sheetId, sheetTabName, auth);
        fullSheetData[sheetTabName] = tabData;
      }

      // Return all the data as JSON
      res.status(200).send(fullSheetData);
    } else {
      res.status(404).json({ message: 'No sheets found in the Google Sheet.' });
    }
  } catch (error) {
    console.error('Error retrieving full sheet data:', error);
    next(error); // Forward the error to Express error handling middleware
  }
};
