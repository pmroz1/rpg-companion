import { Background } from '@data/enums/background.enum';

export interface DndBackground {
  id: Background;
  name: string;
  description?: string;
  proficiencies: string[]; // @TODO: Create Proficiency model
  equipment: string[]; // @TODO: Create Equipment model
}
