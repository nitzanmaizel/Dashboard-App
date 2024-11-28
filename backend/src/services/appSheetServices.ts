import { Model, Types } from 'mongoose';
import {
  AdditionalSheetData,
  IAppSheetData,
  IAppSheetItemData,
  IAppSheetItemDataDocument,
  IFullAppSheetData,
} from '../types/AppSheetTypes';
import AppSheetItemModel from '../models/AppSheetItemModal';
import AppSheetModel from '../models/AppSheetModal';

/**
 * Excluded fields for population to enhance security and performance.
 */
const excludedFields =
  '-accessToken -refreshToken -tokenExpiryDate -updatedAt -createdAt -updatedAt -__v -_ac -_ct -email -role -userId -picture -fullName';

/**
 * Service to fetch all data entries for a specific AppSheet.
 *
 * @param {string} appSheetId - The ID of the AppSheet.
 * @returns {Promise<Object>} - An object containing AppSheet details and its items.
 * @throws {Error} - If the AppSheet is not found.
 */
export const getAppSheetByIdService = async (appSheetId: string): Promise<IFullAppSheetData> => {
  const appSheet = await AppSheetModel.findById(appSheetId).exec();
  if (!appSheet) {
    throw new Error(`Sheet not found for ID: ${appSheetId}`);
  }

  const appSheetItems = (await AppSheetItemModel.find({
    appSheetId: appSheetId,
  })
    .populate('data', excludedFields)
    .lean()
    .exec()) as IAppSheetItemDataDocument[];

  return {
    _id: appSheet._id,
    title: appSheet.title,
    description: appSheet.description,
    type: appSheet.type,
    appSheetItems,
  } as IFullAppSheetData;
};

/**
 * Service to create a new AppSheet.
 *
 * @template T
 * @param {IAppSheetData} appSheetData - The data for the new AppSheet.
 * @param {Model<T>} model - The Mongoose model to use for fetching items.
 * @returns {Promise<IAppSheetData>} - The created AppSheet.
 * @throws {Error} - If no items are found for the specified type.
 */
export const createAppSheetService = async <T>(
  appSheetData: IAppSheetData,
  model: Model<T>
): Promise<IAppSheetData> => {
  const { title, description, type, additionalData } = appSheetData;
  const appSheet = new AppSheetModel({ title, description, type, additionalData });

  await appSheet.save();

  const items = await model.find();

  if (items.length === 0) {
    throw new Error(`No items found in the database for type: ${type}`);
  }

  const appSheetItemsArray: IAppSheetItemData[] = items.map((item) => ({
    appSheetId: appSheet._id,
    itemId: item._id as Types.ObjectId,
    data: item,
    additionalData: [...additionalData],
  }));

  await AppSheetItemModel.insertMany(appSheetItemsArray);

  return appSheet;
};

/**
 * Service to fetch a specific sheet item by AppSheet ID and item ID.
 *
 * @param {string} appSheetId - The ID of the AppSheet.
 * @param {string} itemId - The ID of the item.
 * @returns {Promise<IAppSheetItemData | null>} - The sheet item data or null if not found.
 */
export const getSheetItemByIdService = async (
  appSheetId: string,
  itemId: string
): Promise<IAppSheetItemData | null> => {
  const appSheetItem = await AppSheetItemModel.findOne({
    appSheetId,
    itemId,
  }).exec();
  return appSheetItem;
};

/**
 * Service to update an existing AppSheet item.
 *
 * @param {string} appSheetId - The ID of the AppSheet.
 * @param {string} appSheetItemId - The ID of the AppSheet item.
 * @param {AdditionalSheetData[]} additionalData - The additional data to update.
 * @returns {Promise<IAppSheetItemData | null>} - The updated sheet item data or null if not found.
 */
export const updateAppSheetItemService = async (
  appSheetId: string,
  appSheetItemId: string,
  additionalData: AdditionalSheetData[]
): Promise<IAppSheetItemData | null> => {
  const updatedItem = await AppSheetItemModel.findOneAndUpdate(
    { _id: appSheetItemId, appSheetId },
    { additionalData: additionalData },
    { new: true }
  )
    .populate('data', excludedFields)
    .exec();

  return updatedItem;
};

/**
 * Service to delete multiple AppSheet items.
 *
 * @param {string} appSheetId - The ID of the AppSheet.
 * @param {string[]} itemIds - The IDs of the AppSheet items to delete.
 * @returns {Promise<{ message: string; deletedCount: number }>} - The deleted sheet item data.
 */
export const deleteAppSheetItemsService = async (
  appSheetId: string,
  itemIds: string[]
): Promise<{ message: string; deletedCount: number }> => {
  console.log('deleteAppSheetItemsService', { appSheetId, itemIds });

  const deleteResult = await AppSheetItemModel.deleteMany({
    _id: { $in: itemIds },
    appSheetId,
  }).exec();

  console.log({ deleteResult });

  return {
    message: `${deleteResult.deletedCount} items deleted successfully`,
    deletedCount: deleteResult.deletedCount,
  };
};

/**
 * Service to create a new AppSheet item.
 *
 * @param {string} appSheetId - The ID of the AppSheet.
 * @param {AdditionalSheetData[]} userAdditionalData - The additional data for the item.
 * @returns {Promise<IAppSheetItemData>} - The created AppSheet item data.
 */
export const createAppSheetItemService = async (
  appSheetId: string,
  appSheetItemId: string,
  userAdditionalData: AdditionalSheetData[]
): Promise<IAppSheetItemData> => {
  const appSheet = await AppSheetModel.findById(appSheetId).exec();
  if (!appSheet) {
    throw new Error(`Sheet not found for ID: ${appSheetId}`);
  }

  const additionalData = userAdditionalData ? userAdditionalData : appSheet.additionalData;

  const appSheetItem = new AppSheetItemModel({
    appSheetId,
    itemId: appSheetItemId,
    additionalData,
  });

  await appSheetItem.save();

  return appSheetItem;
};
