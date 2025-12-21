import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { InputNumberModule } from 'primeng/inputnumber';
import { CoinsState } from './coins.state';
import { CoinsInfo } from './models/coins-info';

@Component({
  selector: 'app-coins',
  imports: [DndCard, InputNumberModule, ReactiveFormsModule],
  template: `<app-dnd-card title="Coins">
    <div class="grid grid-cols-5 gap-4" [formGroup]="form">
      <div class="flex flex-col items-center gap-2">
        <label for="cp" class="text-center">CP</label>
        <p-inputnumber
          formControlName="cp"
          [showButtons]="true"
          buttonLayout="vertical"
          spinnerMode="vertical"
          inputId="cp"
          [min]="0"
          [inputStyle]="{ width: '100%' }"
        >
          <ng-template #incrementbuttonicon>
            <span class="pi pi-plus"></span>
          </ng-template>
          <ng-template #decrementbuttonicon>
            <span class="pi pi-minus"></span>
          </ng-template>
        </p-inputnumber>
      </div>
      <div class="flex flex-col items-center gap-2">
        <label for="sp" class="text-center">SP</label>
        <p-inputnumber
          formControlName="sp"
          [showButtons]="true"
          buttonLayout="vertical"
          spinnerMode="vertical"
          inputId="sp"
          [min]="0"
          [inputStyle]="{ width: '100%' }"
        >
          <ng-template #incrementbuttonicon>
            <span class="pi pi-plus"></span>
          </ng-template>
          <ng-template #decrementbuttonicon>
            <span class="pi pi-minus"></span>
          </ng-template>
        </p-inputnumber>
      </div>
      <div class="flex flex-col items-center gap-2">
        <label for="ep" class="text-center">EP</label>
        <p-inputnumber
          formControlName="ep"
          [showButtons]="true"
          buttonLayout="vertical"
          spinnerMode="vertical"
          inputId="ep"
          [min]="0"
          [inputStyle]="{ width: '100%' }"
        >
          <ng-template #incrementbuttonicon>
            <span class="pi pi-plus"></span>
          </ng-template>
          <ng-template #decrementbuttonicon>
            <span class="pi pi-minus"></span>
          </ng-template>
        </p-inputnumber>
      </div>
      <div class="flex flex-col items-center gap-2">
        <label for="gp" class="text-center">GP</label>
        <p-inputnumber
          formControlName="gp"
          [showButtons]="true"
          buttonLayout="vertical"
          spinnerMode="vertical"
          inputId="gp"
          [min]="0"
          [inputStyle]="{ width: '100%' }"
        >
          <ng-template #incrementbuttonicon>
            <span class="pi pi-plus"></span>
          </ng-template>
          <ng-template #decrementbuttonicon>
            <span class="pi pi-minus"></span>
          </ng-template>
        </p-inputnumber>
      </div>
      <div class="flex flex-col items-center gap-2">
        <label for="pp" class="text-center">PP</label>
        <p-inputnumber
          formControlName="pp"
          [showButtons]="true"
          buttonLayout="vertical"
          spinnerMode="vertical"
          inputId="pp"
          [min]="0"
          [inputStyle]="{ width: '100%' }"
        >
          <ng-template #incrementbuttonicon>
            <span class="pi pi-plus"></span>
          </ng-template>
          <ng-template #decrementbuttonicon>
            <span class="pi pi-minus"></span>
          </ng-template>
        </p-inputnumber>
      </div>
    </div>
  </app-dnd-card>`,
  styleUrl: './coins.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Coins implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  readonly state = inject(CoinsState);

  coinsState = this.state.state;
  form = new FormGroup({
    cp: new FormControl<number>(0, { nonNullable: true }),
    sp: new FormControl<number>(0, { nonNullable: true }),
    ep: new FormControl<number>(0, { nonNullable: true }),
    gp: new FormControl<number>(0, { nonNullable: true }),
    pp: new FormControl<number>(0, { nonNullable: true }),
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.state.updateState(value as Partial<CoinsInfo>);
    });

    effect(() => {
      const state = this.coinsState();
      if (JSON.stringify(this.form.value) !== JSON.stringify(state)) {
        this.form.patchValue(state, { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.formService.addControl('coins', this.form);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('coins');
  }
}
