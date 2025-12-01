import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicFormService } from '@app/shared/services';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-appearance',
  imports: [CardModule, TextareaModule, ReactiveFormsModule, DividerModule],
  template: `<p-card class="dnd-box p-1 appearance-header" header="APPEARANCE">
    <p-divider class="dnd-divider" />
    <textarea
      pTextarea
      [formControl]="control"
      rows="10"
      class="appearance-textarea p-5"
      placeholder="Enter your appearance here.."
      fluid
    ></textarea>
  </p-card>`,
  styleUrl: './appearance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appearance {
  private readonly formService = inject(DynamicFormService);

  control = new FormControl('', Validators.required);

  ngOnInit() {
    this.formService.addControl('appearance', this.control);
  }

  ngOnDestroy() {
    this.formService.removeControl('appearance');
  }
}
