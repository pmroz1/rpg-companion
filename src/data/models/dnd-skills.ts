import { AbilityType, SkillType } from '../enums';

export interface DndSkill {
  id: SkillType;
  name: string;
  associatedAbility: AbilityType;
}
