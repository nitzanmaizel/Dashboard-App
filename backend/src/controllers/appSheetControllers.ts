import { Request, Response, NextFunction } from 'express';
import {
  createAppSheetItemService,
  updateAppSheetItemService,
  deleteAppSheetItemsService,
  getAppSheetByIdService,
  getSheetItemByIdService,
  createAppSheetService,
} from '../services/appSheetServices';
import { IAppSheetData } from '../types/AppSheetTypes';
import AppSheetSoldierModel from '../models/AppSheetSoldierModal';
import { CollectionNames } from '../types/CollectionTypes';
import AppSheetModel from '../models/AppSheetModal';
import { Model } from 'mongoose';

/**
 * Controller to create a new AppSheet item.
 *
 * @param {Request} req - Express request object containing appSheetId and itemId parameters and additionalData in the body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const createAppSheetItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { appSheetId, appSheetItemId } = req.params;
  const { additionalData } = req.body;

  if (!additionalData) {
    res.status(400).json({ error: 'Additional data is required' });
    return;
  }

  try {
    const sheetData = await createAppSheetItemService(appSheetId, appSheetItemId, additionalData);
    res.status(201).json({ sheetData });
  } catch (error) {
    console.error('Error creating sheet item:', error);
    next(error);
  }
};

/**
 * Controller to update an existing AppSheet item.
 *
 * @param {Request} req - Express request object containing appSheetId and appSheetItemId parameters and additionalData in the body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const updateAppSheetItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { appSheetId, appSheetItemId } = req.params;
  const additionalData = req.body;

  if (!additionalData) {
    res.status(400).json({ error: 'Additional data is required' });
    return;
  }

  try {
    const sheetData = await updateAppSheetItemService(appSheetId, appSheetItemId, additionalData);
    if (!sheetData) {
      res.status(404).json({ error: 'Sheet item not found' });
      return;
    }
    res.status(200).json({ sheetData });
  } catch (error) {
    console.error('Error updating sheet item:', error);
    next(error);
  }
};

/**
 * Controller to delete multiple AppSheet items.
 *
 * @param {Request} req - Express request object containing appSheetId and itemIds in the body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const deleteAppSheetItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { appSheetId } = req.params;
  const { itemIds } = req.body;

  if (!Array.isArray(itemIds) || itemIds.length === 0) {
    res.status(400).json({ error: 'Invalid or empty itemIds array' });
    return;
  }

  try {
    const { message, deletedCount } = await deleteAppSheetItemsService(appSheetId, itemIds);

    res.status(200).json({ message, deletedCount });
  } catch (error) {
    console.error('Error deleting sheet items:', error);
    next(error);
  }
};

/**
 * Controller to fetch all data entries for a specific AppSheet.
 *
 * @param {Request} req - Express request object containing appSheetId parameter.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const getAppSheetByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { appSheetId } = req.params;

  try {
    const sheetData = await getAppSheetByIdService(appSheetId);
    res.status(200).json({ sheetData });
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    next(error);
  }
};

/**
 * Controller to fetch a specific AppSheet item by its ID.
 *
 * @param {Request} req - Express request object containing appSheetId and itemId parameters.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const getAppSheetItemByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { appSheetId, appSheetItemId } = req.params;

  try {
    const sheetData = await getSheetItemByIdService(appSheetId, appSheetItemId);
    if (!sheetData) {
      res.status(404).json({ error: 'Sheet data not found' });
      return;
    }
    res.status(200).json({ sheetData });
  } catch (error) {
    console.error('Error fetching sheet item data:', error);
    next(error);
  }
};

/**
 * Controller to create a new AppSheet.
 *
 * @param {Request} req - Express request object containing title, description, additionalData, and type in the body.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const createAppSheetController = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      additionalData,
      type = CollectionNames.AppSheetSoldiers,
    } = req.body;

    if (!title || !description || !additionalData || !type) {
      res.status(400).json({ error: 'Title, description, type, and additionalData are required' });
      return;
    }

    const newAppSheet: IAppSheetData = { title, description, additionalData, type };

    const appSheet = await createAppSheetService(newAppSheet, AppSheetSoldierModel);

    res.status(201).json({ message: 'Sheet created successfully', appSheet });
  } catch (error) {
    console.error('Error creating sheet:', error);
    res.status(500).json({ error: 'Failed to create sheet' });
  }
};

export const getAllAppSheetsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const appSheets = await AppSheetModel.find();
    res.status(201).json(appSheets);
  } catch (error: any) {
    console.error('Error creating sheet:', error);
    res.status(500).json({ error: 'Failed to create sheet' });
  }
};

const collectionMapper = {
  'app-sheet-soldiers': AppSheetSoldierModel,
  'app-sheet-vehicles': AppSheetModel,
};

const excludeFields =
  '-accessToken -refreshToken -tokenExpiryDate -updatedAt -createdAt -updatedAt -__v -_ac -_ct -userId -fullName -equipment -picture';

export const getAppSheetCollectionItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { collectionName } = req.params;

    const modal: Model<any> = collectionMapper[collectionName as keyof typeof collectionMapper];

    if (!modal) {
      res.status(400).json({ error: 'Invalid collection name' });
      return;
    }
    const collectionItems = await modal.find().select(excludeFields).lean();

    res.status(201).json(collectionItems);
  } catch (error: any) {
    console.error('Error getAppSheetCollectionItemsController:', error);
    next(error);
  }
};
