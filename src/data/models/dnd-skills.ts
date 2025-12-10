import { AbilityType, Skill } from '../enums';

export interface DndSkill {
  id: Skill;
  name: string;
  associatedAbility: AbilityType;
}
