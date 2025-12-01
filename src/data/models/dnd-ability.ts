import { AbilityType } from '../enums';

export interface DndAbility {
  id: AbilityType;
  name: string;
  abbreviation: string;
  description: string;
}
