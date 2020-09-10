import { WeekendMissionStage } from "./weekendMissionStage";

export interface WeekendMission {
    Id: string;
    Titles: Array<string>;
    Subtitles: Array<string>;
    Descriptions: Array<string>;
    Stages: Array<WeekendMissionStage>;
}
