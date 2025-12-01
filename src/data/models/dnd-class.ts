import { AbilityType, ClassType, ArmorProficiency, WeaponProficiency } from '../enums';

export interface DndClass {
  id: ClassType;
  name: string;
  hitDie: number;
  primaryAbility: AbilityType[];
  savingThrows: AbilityType[];
  armorProficiencies: ArmorProficiency[];
  weaponProficiencies: WeaponProficiency[];
  description?: string;
}
