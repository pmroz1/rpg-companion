import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '@shared/services/dynamic-form.service';

import { Appearance } from './components/appearance/appearance';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DndGrid, DndGridCell } from '@app/shared/components/dnd-grid/dnd-grid';
import { Info } from './components/info/info';
import { Tabs } from './components/tabs/tabs';
import { Proficiencies } from './components/proficiencies/proficiencies';
import { SpellSlots } from './components/spell-slots/spell-slots';
import { ArmorClass } from './components';

@Component({
  selector: 'app-character-sheet',
  imports: [
    ReactiveFormsModule,
    Appearance,
    Info,
    Tabs,
    Proficiencies,
    DndCard,
    DndGrid,
    DndGridCell,
    JsonPipe,
    SpellSlots,
    ArmorClass,
  ],
  template: `<form [formGroup]="characterSheetForm.getFormGroup()">
    <app-dnd-grid>
      <app-dnd-grid-cell [colspan]="5" [rowspan]="2">
        <app-info />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="1" [rowspan]="2">
        <app-armor-class />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="6" [rowspan]="2">
        <app-dnd-card title="hitpoints" />
      </app-dnd-grid-cell>

      <app-dnd-grid-cell [colspan]="2">
        <app-dnd-card title="proficiency bonus" />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="2">
        <app-dnd-card title="initiative" />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="2">
        <app-dnd-card title="speed" />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="2">
        <app-dnd-card title="size" />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="2">
        <app-dnd-card title="passive perception" />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="2">
        <app-dnd-card title="inspiration" />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="3" [rowspan]="2">
        <app-dnd-card title="abilities" />
      </app-dnd-grid-cell>

      <app-dnd-grid-cell [colspan]="4">
        <app-dnd-card title="spellcasting ability" />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="5">
        <app-spell-slots title="spell slots" />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="9">
        <app-tabs />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="4">
        <app-proficiencies />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="4">
        <app-appearance />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="4">
        <app-dnd-card title="equipment" />
      </app-dnd-grid-cell>
      <app-dnd-grid-cell [colspan]="12">
        <app-dnd-card title="Character Sheet Form Value">{{
          characterSheetForm.getFormGroup().value | json
        }}</app-dnd-card>
      </app-dnd-grid-cell>
    </app-dnd-grid>
  </form>`,
  styleUrls: ['./character-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheet {
  characterSheetForm = inject(DynamicFormService);
}
