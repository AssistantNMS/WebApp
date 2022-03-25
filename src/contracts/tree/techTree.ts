export interface UnlockableTechTree {
    Id: string;
    Name: string;
    Trees: Array<TechTree>;
}

export interface TechTree {
    Id: string;
    Name: string;
    CostType: CurrencyType;
    Children: Array<TechTreeNode>;
}

export interface TechTreeNode {
    Id: string;
    Icon: string;
    Title: string;
    Cost: number;
    Children: Array<TechTreeNode>;
}


export enum CurrencyType {
    None,
    Credits,
    Nanites,
    Quicksilver,
    SalvagedData,
    FactoryOverride,
}