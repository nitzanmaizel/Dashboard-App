import { Request, Response, NextFunction } from 'express';
import AdminUserModal from '../models/AdminUserModal';
import AppSheetSoldierModel from '../models/AppSheetSoldierModal';

const excludeFields =
  '-accessToken -refreshToken -tokenExpiryDate -updatedAt -createdAt -updatedAt -__v -_ac -_ct -userId -fullName -equipment -picture';

export const getAllAdminUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log({ user: req.user });

  const adminUsers = await AdminUserModal.find().select(excludeFields).lean();

  console.log({ adminUsers });

  try {
    res.status(201).json(adminUsers);
  } catch (error) {
    console.error('Error getAllAdminUsersController:', error);
    next(error);
  }
};

export const createAdminUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { personalNumber } = req.params;
    const { email } = req.body;

    console.log({ personalNumber, email, body: req.body });

    if (!personalNumber || !email) {
      res.status(400).json({ message: 'Personal number is required' });
      return;
    }

    const existingUser = await AppSheetSoldierModel.findOne({ personalNumber })
      .select(`${excludeFields} -_id`)
      .lean();

    if (!existingUser) {
      res.status(400).json({ message: 'Soldier not found' });
      return;
    }

    const adminUserRaw = { ...existingUser, email };

    const adminUser = new AdminUserModal(adminUserRaw);

    console.log({ adminUser });

    await adminUser.save();
    res.status(201).json(adminUser);
  } catch (error) {
    console.error('Error createAdminUserController:', error);
    next(error);
  }
  console.log('Creating admin user...');
};
