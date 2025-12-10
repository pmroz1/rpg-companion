import { Type } from '@angular/core';
import { Appearance } from './components/appearance/appearance';
import { ArmorClass } from './components/armor-class/armor-class';
import { Info } from './components/info/info';
import { Proficiencies } from './components/proficiencies/proficiencies';
import { SpellSlots } from './components/spell-slots/spell-slots';
import { TabsComponent } from './components/tabs/tabs';

export interface ComponentConfig {
  component: Type<unknown>;
  enableFullscreen?: boolean;
  enableExplain?: boolean;
}

export const fullscreenMap = new Map<string, ComponentConfig>([
  ['app-info', { component: Info, enableFullscreen: true, enableExplain: true }],
  ['app-armor-class', { component: ArmorClass, enableFullscreen: false, enableExplain: false }],
  ['app-proficiencies', { component: Proficiencies, enableFullscreen: true, enableExplain: true }],
  ['app-spell-slots', { component: SpellSlots, enableFullscreen: true, enableExplain: false }],
  ['app-appearance', { component: Appearance, enableFullscreen: true, enableExplain: true }],
  ['app-tabs', { component: TabsComponent, enableFullscreen: true, enableExplain: false }],
]);
