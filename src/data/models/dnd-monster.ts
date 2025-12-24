import { Alignment, CreatureHabitat, CreatureSize, CreatureType } from '@data/enums';

export interface DndMonster {
  name: string;
  type: CreatureType;
  size: CreatureSize;
  habitats: CreatureHabitat[];
  challengeRating: string;
  armorClass: number;
  hitPoints: number;
  hitPointsFormula: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  alignment: Alignment;
  speed: string;
  languages: string[];
  senses: string[];
  actions: string[];
  gear?: string[];
  traits?: string[];
  skills?: string[];
  vulnerabilities?: string[];
  resistances?: string[];
  immunities?: string[];
  bonusActions?: string[];
  legendaryActions?: string[];
  reactions?: string[];
}
