import { AbilityType } from '@data/enums';

export interface DndTool {
  id: string;
  name: string;
  ability: AbilityType;
  weight?: number; // in LBs
  description?: string;
  utilizeActions?: string[];
  craftingOutcome?: string[];
}
