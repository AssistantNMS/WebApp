export interface RequiredItem {
  Id: string;
  Quantity: number;
}

export interface ProcessorRequiredItem extends RequiredItem {
  processorId: string;
}
