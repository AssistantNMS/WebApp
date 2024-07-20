export interface TwitchDrop {
  Id: number;
  StartDate: Date;
  EndDate: Date;
  Days: Array<TwitchDropDay>;
}

export interface TwitchDropDay {
  DayNumber: number;
  Rewards: Array<TwitchDropReward>;
}

export interface TwitchDropReward {
  Id: string;
  WatchTimeInMin: number;
}
