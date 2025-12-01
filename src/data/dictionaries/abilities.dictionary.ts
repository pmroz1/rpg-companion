import { DndAbility } from '../models';
import { AbilityType } from '../enums';

export const DND_ABILITIES: readonly DndAbility[] = [
  {
    id: AbilityType.Strength,
    name: 'Strength',
    abbreviation: 'STR',
    description: 'Measures physical power',
  },
  {
    id: AbilityType.Dexterity,
    name: 'Dexterity',
    abbreviation: 'DEX',
    description: 'Measures agility and reflexes',
  },
  {
    id: AbilityType.Constitution,
    name: 'Constitution',
    abbreviation: 'CON',
    description: 'Measures endurance',
  },
  {
    id: AbilityType.Intelligence,
    name: 'Intelligence',
    abbreviation: 'INT',
    description: 'Measures reasoning and memory',
  },
  {
    id: AbilityType.Wisdom,
    name: 'Wisdom',
    abbreviation: 'WIS',
    description: 'Measures perception and insight',
  },
  {
    id: AbilityType.Charisma,
    name: 'Charisma',
    abbreviation: 'CHA',
    description: 'Measures force of personality',
  },
] as const;
