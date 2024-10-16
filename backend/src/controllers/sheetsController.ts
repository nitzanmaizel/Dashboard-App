import { Request, Response, NextFunction } from 'express';
import { getGSheetByIdService } from '../services/sheetServices';

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
