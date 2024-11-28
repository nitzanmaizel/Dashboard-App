import { Schema, model } from 'mongoose';
import { IAppSheetItemDataDocument } from '../types/AppSheetTypes';
import { CollectionNames } from '../types/CollectionTypes';

const additionalDataSchema = new Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const appSheetItemSchema = new Schema<IAppSheetItemDataDocument>(
  {
    appSheetId: { type: Schema.Types.ObjectId, ref: CollectionNames.AppSheets, required: true },
    itemId: { type: Schema.Types.ObjectId, ref: CollectionNames.AppSheetSoldiers, required: true },
    data: { type: Schema.Types.ObjectId, ref: CollectionNames.AppSheetSoldiers, default: null },
    additionalData: { type: [additionalDataSchema], default: [] },
  },
  { timestamps: true }
);

/**
 * Compound index on appSheetId and itemId.
 * - Ensures that each user has only one SheetData document per sheet.
 * - Optimizes queries that filter by appSheetId and itemId.
 */
appSheetItemSchema.index({ appSheetId: 1, itemId: 1 }, { unique: true });

/**
 * Index on appSheetId.
 * - Optimizes queries that retrieve all SheetData for a specific sheet.
 */
appSheetItemSchema.index({ appSheetId: 1 });

const AppSheetItemModel = model<IAppSheetItemDataDocument>(
  CollectionNames.AppSheetItems,
  appSheetItemSchema
);
export default AppSheetItemModel;
