import express from 'express';
import {
  createAppSheetController,
  getAppSheetByIdController,
  updateAppSheetItemController,
  getAllAppSheetsController,
  getAppSheetItemByIdController,
  deleteAppSheetItemsController,
  createAppSheetItemController,
  getAppSheetCollectionItemsController,
} from '../controllers/appSheetControllers';
const router = express.Router();

/**
 * GET /:appSheetId/data
 * Fetches all data entries for a specific AppSheet.
 *
 * @param {Request} req - Express request object containing appSheetId parameter.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a JSON response containing the AppSheet data.
 */
router.get('/:appSheetId/data', getAppSheetByIdController);

router.post('/:appSheetId/item/:appSheetItemId', createAppSheetItemController);

router.get('/:appSheetId/item/:appSheetItemId', getAppSheetItemByIdController);

router.put('/:appSheetId/item/:appSheetItemId', updateAppSheetItemController);

router.delete('/:appSheetId/items', deleteAppSheetItemsController);

router.get('/collection/:collectionName', getAppSheetCollectionItemsController);

router.get('/', getAllAppSheetsController);

// Create a new AppSheet
router.post('/', createAppSheetController);
export default router;
