export interface IAppSheet {
  _id: string;
  title: string;
  description: string;
  appSheetItems: AppSheetItem[];
}

export interface AppSheetItem {
  _id: string;
  appSheetId: string;
  itemId: string;
  data: AppSheetItemInfo;
  additionalData: AdditionalData;
  [k: string]: unknown;
}

export type AdditionalData = { key: string; value: string }[];

export interface AppSheetItemInfo {
  _id: string;
  [k: string]: unknown;
}

export interface NewSheetData {
  _id?: string;
  title: string;
  description: string;
  additionalData: { key: string; value: string }[];
  createdAt?: string;
  updatedAt?: string;
}
