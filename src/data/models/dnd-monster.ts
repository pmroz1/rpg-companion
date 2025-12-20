import { Alignment, CreatureHabitat, CreatureSize, CreatureType } from '@data/enums';

export interface DndMonster {
  name: string;
  challengeRating: number;
  armorClass: number;
  hitPointsFormula: string;
  type: CreatureType;
  size: CreatureSize;
  habitat: CreatureHabitat;
  alignment: Alignment;
  hitPoints: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  speed: string;
  languages: string[];
  actions: string[];
  gear: string[];
}
