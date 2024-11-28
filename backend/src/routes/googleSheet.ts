import express from 'express';
import {
  createGoogleSheetController,
  loadGoogleSheetController,
  updateGoogleSheetController,
} from '../controllers/googleSheetController';

const router = express.Router();

router.get('/:googleSheetId/load', loadGoogleSheetController);
router.post('/:appSheetId', createGoogleSheetController);
router.put('/:googleSheetId/update', updateGoogleSheetController);

export default router;
