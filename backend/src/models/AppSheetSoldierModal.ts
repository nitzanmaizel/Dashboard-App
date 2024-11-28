import { Schema, model, Model } from 'mongoose';
import { IAppSheetSoldierDocument } from '../types/AppSheetTypes';
import { CollectionNames } from '../types/CollectionTypes';

const appSheetSoldierSchema = new Schema<IAppSheetSoldierDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    personalNumber: { type: String, unique: true, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    equipment: { type: String },
    notes: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

const AppSheetSoldierModel: Model<IAppSheetSoldierDocument> = model<IAppSheetSoldierDocument>(
  CollectionNames.AppSheetSoldiers,
  appSheetSoldierSchema
);
export default AppSheetSoldierModel;
