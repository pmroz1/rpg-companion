import { ClassType, SubclassType } from '@data/enums';

export interface CharacterInfo {
  name: string;
  background: string;
  race: string;
  class: ClassType | null;
  subclass: SubclassType | null;
  level: number;
  xp: number;
}
