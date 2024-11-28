import { Schema, model } from 'mongoose';
import { IAppSheetDocument } from '../types/AppSheetTypes';
import { CollectionNames } from '../types/CollectionTypes';

const keyValuePairSchema = new Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const appSheetSchema = new Schema<IAppSheetDocument>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    additionalData: { type: [keyValuePairSchema], default: [] },
  },
  { timestamps: true }
);

appSheetSchema.index({ title: 1 });

const AppSheetModel = model<IAppSheetDocument>(CollectionNames.AppSheets, appSheetSchema);
export default AppSheetModel;
