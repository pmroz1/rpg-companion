import { DndSkill } from '../models';
import { AbilityType, SkillType } from '../enums';

export const DND_SKILLS: readonly DndSkill[] = [
  { id: SkillType.Acrobatics, name: 'Acrobatics', associatedAbility: AbilityType.Dexterity },
  { id: SkillType.AnimalHandling, name: 'Animal Handling', associatedAbility: AbilityType.Wisdom },
  { id: SkillType.Arcana, name: 'Arcana', associatedAbility: AbilityType.Intelligence },
  { id: SkillType.Athletics, name: 'Athletics', associatedAbility: AbilityType.Strength },
  { id: SkillType.Deception, name: 'Deception', associatedAbility: AbilityType.Charisma },
  { id: SkillType.History, name: 'History', associatedAbility: AbilityType.Intelligence },
  { id: SkillType.Insight, name: 'Insight', associatedAbility: AbilityType.Wisdom },
  { id: SkillType.Intimidation, name: 'Intimidation', associatedAbility: AbilityType.Charisma },
  {
    id: SkillType.Investigation,
    name: 'Investigation',
    associatedAbility: AbilityType.Intelligence,
  },
  { id: SkillType.Medicine, name: 'Medicine', associatedAbility: AbilityType.Wisdom },
  { id: SkillType.Nature, name: 'Nature', associatedAbility: AbilityType.Intelligence },
  { id: SkillType.Perception, name: 'Perception', associatedAbility: AbilityType.Wisdom },
  { id: SkillType.Performance, name: 'Performance', associatedAbility: AbilityType.Charisma },
  { id: SkillType.Persuasion, name: 'Persuasion', associatedAbility: AbilityType.Charisma },
  { id: SkillType.Religion, name: 'Religion', associatedAbility: AbilityType.Intelligence },
  {
    id: SkillType.SleightOfHand,
    name: 'Sleight of Hand',
    associatedAbility: AbilityType.Dexterity,
  },
  { id: SkillType.Stealth, name: 'Stealth', associatedAbility: AbilityType.Dexterity },
  { id: SkillType.Survival, name: 'Survival', associatedAbility: AbilityType.Wisdom },
] as const;
