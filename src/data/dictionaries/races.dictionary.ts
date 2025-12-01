import { RaceType, TraitType } from '@data/enums';
import { DndRace } from '@data/models/dnd-race';

export const DND_RACES: DndRace[] = [
  {
    id: RaceType.Human,
    name: 'Human',
    description: '...',
    size: 'Medium',
    speed: 30,
    traits: [TraitType.None],
  },
];
