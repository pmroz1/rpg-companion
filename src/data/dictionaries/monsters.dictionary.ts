import { DndMonster } from '../models';
import { Alignment, CreatureHabitat, CreatureSize, CreatureType } from '../enums';

export const DND_MONSTERS: readonly DndMonster[] = [
  {
    name: 'Bandit',
    challengeRating: 1 / 8,
    armorClass: 12,
    hitPointsFormula: '2d8+2',
    hitPoints: 11,
    strength: 11,
    dexterity: 12,
    constitution: 12,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    speed: '30 ft.',
    languages: ['Common', "Thieves' Cant"],
    actions: ['Scimitar', 'Light crossbow'],
    gear: ['Scimitar', 'Light crossbow', 'Leather armor'],
    type: CreatureType.Humanoid,
    size: CreatureSize.MediumOrSmall,
    habitat: CreatureHabitat.Any,
    alignment: Alignment.TrueNeutral,
  },
] as const;
