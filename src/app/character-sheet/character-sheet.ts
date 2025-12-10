import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '@shared/services/dynamic-form.service';

import { Appearance } from './components/appearance/appearance';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Info } from './components/info/info';
import { Tabs } from './components/tabs/tabs';
import { Proficiencies } from './components/proficiencies/proficiencies';
import { SpellSlots } from './components/spell-slots/spell-slots';
import { ArmorClass } from './components';
import { Abilities } from './components/abilities/abilities';

@Component({
  selector: 'app-character-sheet',
  imports: [
    ReactiveFormsModule,
    Appearance,
    Info,
    Tabs,
    Proficiencies,
    DndCard,
    JsonPipe,
    SpellSlots,
    ArmorClass,
    Abilities,
  ],
  template: `<form [formGroup]="characterSheetForm.getFormGroup()" class="sheet-grid">
    <app-info class="span-5 row-span-2" />
    <app-armor-class class="span-1 row-span-2" />
    <app-dnd-card title="hitpoints" class="span-6 row-span-2" />

    <app-dnd-card title="proficiency bonus" class="span-2" />
    <app-dnd-card title="initiative" class="span-2" />
    <app-dnd-card title="speed" class="span-2" />
    <app-dnd-card title="size" class="span-2" />
    <app-dnd-card title="passive perception" class="span-2" />
    <app-dnd-card title="inspiration" class="span-2" />
    <!-- <app-dnd-card title="abilities" class="span-3 row-span-2" /> -->
    <app-abilities class="span-3 row-span-2" />

    <app-dnd-card title="spellcasting ability" class="span-4" />
    <app-spell-slots title="spell slots" class="span-5" />
    <app-tabs class="span-9" />
    <app-proficiencies class="span-4" />
    <app-appearance class="span-4" />
    <app-dnd-card title="equipment" class="span-4" />
    <app-dnd-card title="Character Sheet Form Value" class="span-12">{{
      characterSheetForm.getFormGroup().value | json
    }}</app-dnd-card>
  </form>`,
  styleUrls: ['./character-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheet {
  characterSheetForm = inject(DynamicFormService);
}
