import { DndAbility } from '../models';
import { AbilityType, Skill } from '../enums';

export const DND_ABILITIES: readonly DndAbility[] = [
  {
    id: AbilityType.Strength,
    name: 'Strength',
    abbreviation: 'STR',
    description: 'Measures physical power',
    skills: [Skill.Athletics],
  },
  {
    id: AbilityType.Dexterity,
    name: 'Dexterity',
    abbreviation: 'DEX',
    description: 'Measures agility and reflexes',
    skills: [Skill.Acrobatics, Skill.SleightOfHand, Skill.Stealth],
  },
  {
    id: AbilityType.Constitution,
    name: 'Constitution',
    abbreviation: 'CON',
    description: 'Measures endurance',
    skills: [],
  },
  {
    id: AbilityType.Intelligence,
    name: 'Intelligence',
    abbreviation: 'INT',
    description: 'Measures reasoning and memory',
    skills: [Skill.Arcana, Skill.History, Skill.Investigation, Skill.Nature, Skill.Religion],
  },
  {
    id: AbilityType.Wisdom,
    name: 'Wisdom',
    abbreviation: 'WIS',
    description: 'Measures perception and insight',
    skills: [Skill.AnimalHandling, Skill.Insight, Skill.Medicine, Skill.Perception, Skill.Survival],
  },
  {
    id: AbilityType.Charisma,
    name: 'Charisma',
    abbreviation: 'CHA',
    description: 'Measures force of personality',
    skills: [Skill.Deception, Skill.Intimidation, Skill.Performance, Skill.Persuasion],
  },
] as const;
