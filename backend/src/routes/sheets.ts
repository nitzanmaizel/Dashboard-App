import express from 'express';
import { getFullSheetDataController } from '../controllers/sheetsController';

const router = express.Router();

router.get('/:sheetId', getFullSheetDataController);

export default router;
