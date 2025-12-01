import { DamageType, WeaponProficiency, WeaponProperty, WeaponType } from '../enums';

export interface DndWeapon {
  id: WeaponType;
  name: string;
  damageDie: string;
  damageType: DamageType;
  properties: WeaponProperty[];
  proficiency: WeaponProficiency;
  range?: { normal: number; long?: number };
}
