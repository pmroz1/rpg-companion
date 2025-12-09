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
  selector: 'sheet-armor-class',
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
      <p-inputNumber [(ngModel)]="armorClass" class="ac-input"></p-inputNumber>
      <app-dnd-checkbox [(checked)]="hasShield" label="Shield"></app-dnd-checkbox>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .shield-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 5;
      color: var(--color-parchment);
    }

    .shield-svg {
      width: 100%;
      height: 100%;
      display: block;
      fill: var(--color-gold-dark);
      stroke: var(--color-parchment);
      stroke-width: 2;
    }

    .ac-input {
      position: absolute;
      top: 40%;
      left: 50%;
      width: 40%;
      transform: translate(-50%, -50%);
    }

    :host ::ng-deep .ac-input .p-inputtext {
      width: 100% !important;
      height: auto !important;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: calc(10vw / 4);
      color: var(--color-parchment);
      line-height: 1.1;
      text-align: center;
      background: transparent;
      border: none;
      outline: none;
      appearance: textfield;
      -moz-appearance: textfield;
      padding: 0.1rem 0.25rem;
      box-sizing: border-box;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArmorClass implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  private readonly injector = inject(Injector);
  control = new FormControl('', Validators.required);
  armorClass = signal(15);
  hasShield = signal(false);
  effectiveArmorClass = computed(() => {
    return this.armorClass() + (this.hasShield() ? 2 : 0);
  });

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
