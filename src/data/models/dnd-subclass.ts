import { ClassType, SubclassType } from '../enums';

export interface DndSubclass {
  id: SubclassType;
  name: string;
  parentClass: ClassType;
  description?: string;
}
