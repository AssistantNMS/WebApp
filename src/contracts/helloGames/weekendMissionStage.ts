export interface WeekendMissionStage {
    Level: number;
    NpcMessage: string;
    AppId: string;
    IterationAppId: string;
    Quantity: number;
    NpcMessageFlows: NpcMessageFlows;
    PortalMessageFlows: NpcMessageFlows;
}

export interface Option {
    Name: string;
    IfSelected: NpcMessageFlows;
}

export interface NpcMessageFlows {
    IncomingMessages: Array<string>;
    Options: Array<Option>;
}