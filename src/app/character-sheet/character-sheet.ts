import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '@shared/services/dynamic-form.service';
import { ArmorClass } from './components/armor-class/armor-class';
import { Appearance } from './components/appearance/appearance';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Info } from './components/info/info';
import { Tabs } from './components/tabs/tabs';
import { Proficiencies } from './components/proficiencies/proficiencies';
import { SpellSlots } from "./components/spell-slots/spell-slots";

@Component({
  selector: 'app-character-sheet',
  imports: [ReactiveFormsModule, JsonPipe, Appearance, Info, Tabs, Proficiencies, SpellSlots],
  template: `<form [formGroup]="characterSheetForm.getFormGroup()">
    <sheet-tabs />
    <app-appearance></app-appearance>
    <app-proficiencies></app-proficiencies>
    <app-spell-slots></app-spell-slots>
    <sheet-info />
    <pre>{{ characterSheetForm.rawValue() | json }}</pre>
    <pre>{{ characterSheetForm.status() }}</pre>
  </form>`,
  styleUrls: ['./character-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheet {
  characterSheetForm = inject(DynamicFormService);
}
