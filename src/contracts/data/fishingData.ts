export interface FishingData {
  Id: string;
  AppId: string;
  Name: string;
  Icon: string;
  Quality: string;
  Size: string;
  Time: string;
  TimeKey: string;
  Biomes: Array<string>;
  NeedsStorm: boolean;
  RequiresMission: boolean;
  RequiredMissionName: string;
  MissionCatchChanceOverride: number;
}

