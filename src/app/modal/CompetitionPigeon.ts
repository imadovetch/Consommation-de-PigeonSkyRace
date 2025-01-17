import {Pigeon} from "./pigeon";
import {Championship} from "./Championship";

export interface CompetitionPigeon {
  id: number;
  competition: Championship;
  pigeon: Pigeon;
  distance: number | null;
  endTime: string | null;
  score: number | null;
  vitesse: number | null;
}
