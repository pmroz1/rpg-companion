import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '../../../shared/services/dynamic-form.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-armor-class',
  imports: [ReactiveFormsModule],
  template: `<div class="armor-class">
    <label
      >Armor Class
      <input [formControl]="control" type="number" />
      @if (control.invalid && control.touched) {
        {{ control.hasError('required') ? 'Required' : 'Provide a valid number' }}
      }
    </label>
    <div class="error"></div>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArmorClass implements OnInit, OnDestroy {
  private formService = inject(DynamicFormService);
  control = new FormControl('', Validators.required);

  ngOnInit() {
    this.formService.getFormGroup().addControl('armorClass', this.control);
  }

  ngOnDestroy() {
    this.formService.getFormGroup().removeControl('armorClass');
  }
}
