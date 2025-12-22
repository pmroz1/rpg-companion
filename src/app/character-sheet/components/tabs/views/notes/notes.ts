import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OnDestroy,
  effect,
  Injector,
} from '@angular/core';
import { EditorModule, EditorTextChangeEvent } from 'primeng/editor';
import { FormControl, FormsModule } from '@angular/forms';
import { DynamicFormService } from '@app/core/form';
import { NotesState } from './notes.state';
@Component({
  selector: 'app-notes',
  imports: [EditorModule, FormsModule],
  template: `
    <p-editor
      (onTextChange)="onTextChange($event)"
      [ngModel]="notes()"
      class="dnd-editor"
      [style]="{ height: '320px', fontSize: '16px' }"
    >
      <ng-template #header>
        <span class="ql-formats">
          <button type="button" class="ql-bold" aria-label="Bold"></button>
          <button type="button" class="ql-italic" aria-label="Italic"></button>
          <button type="button" class="ql-underline" aria-label="Underline"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered" title="Ordered List"></button>
          <button class="ql-list" value="bullet" title="Bullet List"></button>
          <button class="ql-indent" value="-1" title="Reduce Indent"></button>
          <button class="ql-indent" value="+1" title="Increase Indent"></button>
        </span>
      </ng-template>
    </p-editor>
  `,
  styleUrl: './notes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesTab implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  readonly notesState = inject(NotesState);
  private readonly injector = inject(Injector);
  notes = this.notesState.state;
  control = new FormControl<string>(this.notes());

  onTextChange(event: EditorTextChangeEvent) {
    if (event.htmlValue !== undefined && event.htmlValue !== null) {
      this.notesState.setState(event.htmlValue);
    }
  }

  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.notes());
      },
      { injector: this.injector },
    );

    this.formService.addControl('notes', this.control);
  }
  ngOnDestroy(): void {
    this.formService.removeControl('notes');
  }
}
