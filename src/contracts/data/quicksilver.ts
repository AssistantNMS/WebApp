export interface QuicksilverStore {
    MissionId: number;
    Items: Array<QuicksilverItem>;
}

export interface QuicksilverItem {
    Tier: number;
    ItemId: string;
}