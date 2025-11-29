import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { DynamicFormService } from '../shared/services/dynamic-form.service';

@Component({
  selector: 'app-character-sheet',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `<form [formGroup]="characterSheetForm.getFormGroup()">
    <!-- children here will dynamically add their own fields -->
    <pre>{{ characterSheetForm.rawValue() | json }}</pre>
    <pre>{{ characterSheetForm.status() }}</pre>
  </form>`,
  styleUrls: ['./character-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheet {
  characterSheetForm = inject(DynamicFormService);
}
