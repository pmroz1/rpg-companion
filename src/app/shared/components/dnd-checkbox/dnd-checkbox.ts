import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-dnd-checkbox',
  imports: [Checkbox, FormsModule],
  template: `<span
    class="dnd-checkbox select-none"
    (click)="toggleChecked()"
    tabindex="0"
    role="checkbox"
    [attr.aria-checked]="checked()"
    (keydown.enter)="toggleChecked()"
    (keydown.space)="toggleChecked(); $event.preventDefault()"
  >
    <p-checkbox binary="true" [(ngModel)]="checked"></p-checkbox>
    <span>{{ label() }}</span>
  </span>`,
  styles: `
    :host {
      display: block;
    }
    .dnd-checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-display);
      font-weight: 600;
      color: var(--color-parchment);
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(201, 162, 39, 0.4);
      border-radius: 6px;
      padding: 0.5rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
      cursor: pointer;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DndCheckbox {
  checked = model<boolean>(false);
  label = input.required<string>();

  toggleChecked() {
    this.checked.set(!this.checked());
  }
}
