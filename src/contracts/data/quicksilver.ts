export interface QuicksilverStore {
  MissionId: number;
  Icon: string;
  Name: string;
  Items: Array<QuicksilverItem>;
  ItemsRequired: Array<string>;
}

export interface QuicksilverItem {
  Tier: number;
  ItemId: string;
}
