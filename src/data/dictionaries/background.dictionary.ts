import { Background } from '@data/enums/background.enum';
import { DndBackground } from '@data/models/dnd-background';

export const DND_BACKGROUNDS: DndBackground[] = [
  {
    id: Background.Acolyte,
    name: 'Acolyte',
    description:
      'You have spent your life in the service of a temple to a specific god or pantheon of gods.',
    proficiencies: ['test'], //@TODO:
    equipment: [
      "Caligrapher's supplies",
      'Holy symbol',
      'Prayer book',
      'Parchment (10 sheets)',
      'Robe',
      '8 gp',
    ],
  },
  {
    id: Background.Charlatan,
    name: 'Charlatan',
    description: 'You have always had a way with people.',
    proficiencies: ['test'], //@TODO:
    equipment: ['Crowbar'],
  },
];
