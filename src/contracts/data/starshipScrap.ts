export interface StarshipScrap {
    ShipType: string;
    ShipClassType: string;
    ItemDetails: Array<StarshipScrapItemDetail>;
}

export interface StarshipScrapItemDetail {
    Id: string;
    PercentageChance: number;
    AmountMin: number;
    AmountMax: number;
}
