import { LocaleKey } from '../localization/LocaleKey';

export interface IWeekendMission extends IWeekendMissionMeta {
  id: string;
  name: string;
  weekendMissionJson: LocaleKey;
  season: string;
}

export interface IWeekendMissionMeta {
  level: number;
  maxLevel: number;
  minLevel: number;
}

export const WeekendMissions: Array<IWeekendMission> = [
  {
    id: 'seas-2',
    name: 'Season 2',
    weekendMissionJson: LocaleKey.weekendMissionSeason2Json,
    season: 'MP_PORTALQUEST',
    level: 45,
    maxLevel: 45,
    minLevel: 31,
  },
  {
    id: 'seas-1',
    name: 'Season 1',
    weekendMissionJson: LocaleKey.weekendMissionSeason1Json,
    season: 'MP_PORTALQUEST',
    level: 30,
    maxLevel: 30,
    minLevel: 1,
  },
];
