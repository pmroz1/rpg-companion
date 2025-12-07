import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '@shared/services/dynamic-form.service';

import { Appearance } from './components/appearance/appearance';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Info } from './components/info/info';
import { Tabs } from './components/tabs/tabs';
import { Proficiencies } from './components/proficiencies/proficiencies';
import { ArmorClass } from './components';

@Component({
  selector: 'app-character-sheet',
  imports: [ReactiveFormsModule, Appearance, Info, Tabs, Proficiencies, DndCard],
  template: `<form [formGroup]="characterSheetForm.getFormGroup()" class="sheet-grid">
    <sheet-info class="span-6" />
    <app-dnd-card title="armor class" class="span-3 placeholder" />
    <app-dnd-card title="hitpoints" class="span-3 placeholder" />
    <app-dnd-card title="abilities" class="span-4 placeholder rows-span-6" />
    <sheet-tabs class="span-8" />
    <app-proficiencies class="span-4" />
    <app-appearance class="span-4" />

    <app-dnd-card title="placeholder" class="span-6 placeholder" />
    <app-dnd-card title="placeholder" class="span-6 placeholder" />
    <app-dnd-card title="placeholder" class="span-6 placeholder" />
  </form>`,
  styleUrls: ['./character-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheet {
  characterSheetForm = inject(DynamicFormService);
}
