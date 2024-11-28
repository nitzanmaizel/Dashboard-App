import { Router } from 'express';
import authRoute from './auth';
import appSheetsRoute from './appSheet';
import googleSheetRoute from './googleSheet';
import adminUsersRoute from './adminUsersRoute';
import { authenticateJWT, refreshTokenMiddleware } from '../middleware';

const router = Router();

router.use('/auth', authRoute);

router.use(authenticateJWT, refreshTokenMiddleware);
router.use('/app-sheet', appSheetsRoute);
router.use('/google-sheet', googleSheetRoute);
router.use('/admin-user', adminUsersRoute);

export default router;
