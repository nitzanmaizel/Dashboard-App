import express from 'express';
import { getGSheetByIdController } from '../controllers/sheetsController';

const router = express.Router();

router.get('/:id', getGSheetByIdController);

export default router;
