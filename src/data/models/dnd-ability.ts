import { AbilityType, Skill } from '../enums';

export interface DndAbility {
  id: AbilityType;
  name: string;
  abbreviation: string;
  description: string;
  skills?: readonly Skill[];
}
