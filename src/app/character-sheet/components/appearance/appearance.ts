import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicFormService } from '@app/shared/services';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';

@Component({
  selector: 'app-appearance',
  imports: [CardModule, TextareaModule, ReactiveFormsModule, DividerModule, DndCard],
  template: `<app-dnd-card title="Appearance">
    <textarea
      pTextarea
      [formControl]="control"
      rows="10"
      class="appearance-textarea p-5"
      placeholder="Enter your appearance here.."
      fluid
    ></textarea>
  </app-dnd-card>`,
  styleUrl: './appearance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appearance implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);

  control = new FormControl('', Validators.required);

  ngOnInit() {
    this.formService.addControl('appearance', this.control);
  }

  ngOnDestroy() {
    this.formService.removeControl('appearance');
  }
}
