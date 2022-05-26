export interface ExpeditionSeason {
    Id: string;
    Icon: string;
    StartDate: Date;
    EndDate: Date;
    Title: string;
    PortalCode: string;
    CaptainSteveYoutubePlaylist?: string;
    Phases: Array<ExpeditionSeasonPhase>;
    Rewards: Array<ExpeditionSeasonReward>;
}

export interface ExpeditionSeasonPhase {
    Id: string;
    Icon: string;
    Title: string;
    Description: string;
    DescriptionDone: string;
    Milestones?: Array<ExpeditionSeasonMilestone>;
    Rewards: Array<ExpeditionSeasonReward>;
}

export interface ExpeditionSeasonMilestone {
    Id: string;
    Icon: string;
    Title: string;
    Description: string;
    DescriptionDone: string;
    Type: string,
    Encryption: ExpeditionSeasonMilestoneEncryption,
    Rewards: Array<ExpeditionSeasonReward>;
}

export const MilestoneType = {
    Normal: 'Normal',
    Rendezvous: 'Rendezvous',
    Optional: 'Optional',
}

export interface ExpeditionSeasonMilestoneEncryption {
    Icon: string;
    Title: string;
    Description: string;
}

export interface ExpeditionSeasonReward {
    Id: string;
    Type: number;
    AmountMin: number;
    AmountMax: number;
    Currency: number;
    ProcTechQuality: number;
    HideInSeasonRewards: boolean;
    MultiItemRewardType?: string;
    ProcTechGroup?: string;
    ProcProdType?: string;
    ProcProdRarity?: string;
}

