import { DndSkill } from '../models';
import { AbilityType, Skill } from '../enums';

export const DND_SKILLS: readonly DndSkill[] = [
  { id: Skill.Acrobatics, name: 'Acrobatics', associatedAbility: AbilityType.Dexterity },
  { id: Skill.AnimalHandling, name: 'Animal Handling', associatedAbility: AbilityType.Wisdom },
  { id: Skill.Arcana, name: 'Arcana', associatedAbility: AbilityType.Intelligence },
  { id: Skill.Athletics, name: 'Athletics', associatedAbility: AbilityType.Strength },
  { id: Skill.Deception, name: 'Deception', associatedAbility: AbilityType.Charisma },
  { id: Skill.History, name: 'History', associatedAbility: AbilityType.Intelligence },
  { id: Skill.Insight, name: 'Insight', associatedAbility: AbilityType.Wisdom },
  { id: Skill.Intimidation, name: 'Intimidation', associatedAbility: AbilityType.Charisma },
  {
    id: Skill.Investigation,
    name: 'Investigation',
    associatedAbility: AbilityType.Intelligence,
  },
  { id: Skill.Medicine, name: 'Medicine', associatedAbility: AbilityType.Wisdom },
  { id: Skill.Nature, name: 'Nature', associatedAbility: AbilityType.Intelligence },
  { id: Skill.Perception, name: 'Perception', associatedAbility: AbilityType.Wisdom },
  { id: Skill.Performance, name: 'Performance', associatedAbility: AbilityType.Charisma },
  { id: Skill.Persuasion, name: 'Persuasion', associatedAbility: AbilityType.Charisma },
  { id: Skill.Religion, name: 'Religion', associatedAbility: AbilityType.Intelligence },
  {
    id: Skill.SleightOfHand,
    name: 'Sleight of Hand',
    associatedAbility: AbilityType.Dexterity,
  },
  { id: Skill.Stealth, name: 'Stealth', associatedAbility: AbilityType.Dexterity },
  { id: Skill.Survival, name: 'Survival', associatedAbility: AbilityType.Wisdom },
] as const;
