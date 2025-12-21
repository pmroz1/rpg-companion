import { Language } from '@data/enums/language.enum';
import { DndLanguage } from '@data/models/dnd-language';

export const DND_LANGUAGES: DndLanguage[] = [
  {
    id: Language.Common,
    name: 'Common',
  },
  {
    id: Language.Dwarvish,
    name: 'Dwarvish',
  },
  {
    id: Language.Elvish,
    name: 'Elvish',
  },
  {
    id: Language.Giant,
    name: 'Giant',
  },
  {
    id: Language.Gnomish,
    name: 'Gnomish',
  },
  {
    id: Language.Goblin,
    name: 'Goblin',
  },
  {
    id: Language.Halfling,
    name: 'Halfling',
  },
  {
    id: Language.Orc,
    name: 'Orc',
  },
];
