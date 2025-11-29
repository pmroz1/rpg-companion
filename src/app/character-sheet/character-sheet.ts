import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-character-sheet',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `<form [formGroup]="characterSheetForm">
    <!-- children here will dynamically add their own fields -->
    <pre>{{ characterSheetForm.value | json }}</pre>
    <pre>{{ characterSheetForm.status }}</pre>
  </form>`,
  styleUrls: ['./character-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheet {
  characterSheetForm = new FormGroup({});
}
