import { Types } from 'mongoose';

export interface IFullAppSheetData {
  _id: Types.ObjectId;
  title: string;
  description: string;
  type: string;
  appSheetItems: IAppSheetItemData[];
}

export interface AdditionalSheetData {
  key: string;
  value: string;
}

export interface IAppSheetData {
  title: string;
  description: string;
  type: string;
  additionalData: AdditionalSheetData[];
}

export interface IAppSheetDocument extends IAppSheetData, Document {
  _id: Types.ObjectId;
}

export interface IAppSheetItemData {
  appSheetId: Types.ObjectId;
  itemId: Types.ObjectId;
  data: Types.ObjectId | { [k: string]: unknown };
  additionalData: AdditionalSheetData[];
}

export interface IAppSheetItemDataDocument extends IAppSheetItemData, Document {
  _id: Types.ObjectId;
}

export type HeaderMap<T> = {
  [header: string]: keyof T;
};

export interface IAppSheetSoldier {
  firstName: string;
  lastName: string;
  personalNumber: string;
  phone: string;
  company: string;
  department: string;
  notes?: string;
  equipment?: string;
}

export interface IAppSheetSoldierDocument extends IAppSheetSoldier, Document {
  _id: Types.ObjectId;
}
