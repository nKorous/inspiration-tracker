export interface InspirationData {
  playerKey: number;
  realName: string;
  playerName: string;
  inspOne: boolean;
  inspTwo: boolean;
  inspThree: boolean;
  inspFour: boolean;
  inspFive: boolean;
  campaignKey: number;
}

export interface Campaign {
  campaignKey: number;
  campaignName: string;
  dungeonMaster: string;
}

export interface NewPlayer {
  realName: string;
  playerName: string;
  campaignKey: number
}
