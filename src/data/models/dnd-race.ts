import { RaceType, TraitType } from '@data/enums';

export interface DndRace {
  id: RaceType;
  name: string;
  description?: string;
  size: string;
  speed: number;
  traits: TraitType[];
}
