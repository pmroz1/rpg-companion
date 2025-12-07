import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '@shared/services/dynamic-form.service';

import { Appearance } from './components/appearance/appearance';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Info } from './components/info/info';
import { Tabs } from './components/tabs/tabs';
import { Proficiencies } from './components/proficiencies/proficiencies';
import { SpellSlots } from "./components/spell-slots/spell-slots";

@Component({
  selector: 'app-character-sheet',
  imports: [ReactiveFormsModule, Appearance, Info, Tabs, Proficiencies, DndCard, JsonPipe],
  template: `<form [formGroup]="characterSheetForm.getFormGroup()" class="sheet-grid">
    <sheet-info class="span-5 row-span-2" />
    <app-dnd-card title="armor class" class="span-2" />
    <app-dnd-card title="hitpoints" class="span-5" />
    <app-dnd-card title="initiative | speed | size | passive perception" class="span-7" />

    <app-dnd-card title="abilities" class="span-4 row-span-2" />
    <app-dnd-card title="spellcasting ability" class="span-4" />
    <app-dnd-card title="spell slots" class="span-4" />
    <sheet-tabs class="span-8" />
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
