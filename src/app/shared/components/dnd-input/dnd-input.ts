import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  input,
  model,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { DynamicFormService } from '@app/shared/services';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-dnd-input',
  imports: [InputNumber, FormsModule],
  template: `<p-inputNumber
    [mode]="'decimal'"
    [min]="0"
    [max]="9999"
    [useGrouping]="false"
    [ngModel]="value()"
  ></p-inputNumber>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DndInput implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  private readonly control = new FormControl<number>(0);
  private readonly injector = inject(Injector);
  controlName = input.required<string>();

  value = model(0);

  ngOnInit() {
    effect(
      () => {
        this.control.setValue(this.value());
      },
      { injector: this.injector },
    );

    this.formService.addControl(this.controlName(), this.control);
  }

  ngOnDestroy() {
    this.formService.removeControl(this.controlName());
  }
}
