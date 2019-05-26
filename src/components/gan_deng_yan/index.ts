export interface Player {
  name: string;
  inGame: boolean;
  winCount: number;
  score: number;
}

export enum Order {
  DESC, ASEC,
}
