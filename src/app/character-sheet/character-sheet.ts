import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '@shared/services/dynamic-form.service';
import { ArmorClass } from './components/armor-class/armor-class';
import { Appearance } from './components/appearance/appearance';
import { Proficiencies } from "./proficiencies/proficiencies";

@Component({
  selector: 'app-character-sheet',
  imports: [ReactiveFormsModule, JsonPipe, ArmorClass, Appearance, Proficiencies],
  template: `<form [formGroup]="characterSheetForm.getFormGroup()">
    <!-- children here will dynamically add their own fields -->
    <app-proficiencies></app-proficiencies>
    <app-appearance></app-appearance>
    <pre>{{ characterSheetForm.rawValue() | json }}</pre>
    <pre>{{ characterSheetForm.status() }}</pre>
  </form>`,
  styleUrls: ['./character-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheet {
  characterSheetForm = inject(DynamicFormService);
}
