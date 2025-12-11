import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Injector,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicFormService } from '@shared/services/dynamic-form.service';
import { FormControl, Validators } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { DndCheckbox } from '@app/shared/components/dnd-checkbox/dnd-checkbox';
@Component({
  selector: 'app-armor-class',
  imports: [FormsModule, InputNumber, DndCheckbox],
  template: `
    <div
      class="shield-wrapper bg-dnd-darken p-2 rounded-lg flex flex-col items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 80"
        preserveAspectRatio="xMidYMid meet"
        class="shield-svg"
      >
        <path
          d="M32 2 L10 10 V32 C10 48 20 62 32 78 C44 62 54 48 54 32 V10 Z"
          class="shield-shape"
        />
      </svg>
      <p-inputNumber
        class="ac-input"
        [ngModel]="effectiveArmorClass()"
        (ngModelChange)="armorClass.set($event)"
        [min]="0"
        [max]="30"
      ></p-inputNumber>

      <app-dnd-checkbox
        class="h-100screen mt-2 mb-auto"
        [(checked)]="hasShield"
        label="Shield (+2)"
      ></app-dnd-checkbox>
    </div>
  `,
  styleUrls: ['./armor-class.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArmorClass implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  private readonly injector = inject(Injector);
  private readonly control = new FormControl('', Validators.required);

  armorClass = signal(10);
  hasShield = signal(false);

  effectiveArmorClass = computed(() => this.armorClass() + (this.hasShield() ? 2 : 0));

  ngOnInit() {
    effect(
      () => {
        this.control.setValue(this.effectiveArmorClass().toString());
      },
      { injector: this.injector },
    );

    this.formService.addControl('armorClass', this.control);
  }

  ngOnDestroy() {
    this.formService.removeControl('armorClass');
  }
}
