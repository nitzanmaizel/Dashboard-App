export type CellValue = string | number | null;

export type SheetRow = CellValue[];

export type SheetData = SheetRow[];

export interface FetchAPIResponse {
  [key: string]: SheetData;
}

export type Row = { id: number; [key: string]: CellValue };

export type GroupedData = { [key: string]: Row[] };
