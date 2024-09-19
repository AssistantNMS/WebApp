export interface BaitData {
    Id:string;
    AppId: string;
    RarityBoosts: RarityBoosts;
    SizeBoosts: SizeBoosts;
    DayTimeBoost: number;
    NightTimeBoost: number;
    StormBoost: number;
}

export interface RarityBoosts {
    Junk: number;
    Common: number;
    Rare: number;
    Epic: number;
    Legendary: number;
}

export interface SizeBoosts {
    Small: number;
    Medium: number;
    Large: number;
    ExtraLarge: number;
}
