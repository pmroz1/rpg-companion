import { Type } from '@angular/core';
import {
  Appearance,
  ArmorClass,
  Info,
  Proficiencies,
  SpellSlots,
  Tabs,
} from '@app/character-sheet';

export const fullscreenMap = new Map<string, Type<unknown>>([
  ['app-info', Info],
  ['app-armor-class', ArmorClass],
  ['app-proficiencies', Proficiencies],
  ['app-spell-slots', SpellSlots],
  ['app-appearance', Appearance],
  ['app-tabs', Tabs],
]);
