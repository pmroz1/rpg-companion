import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { InputNumberModule } from 'primeng/inputnumber';
import { CoinsState } from './coins.state';
import { FormControl, FormsModule } from '@angular/forms';
import { CoinsInfo } from './models/coins-info';
@Component({
  selector: 'app-coins',
  imports: [DndCard, InputNumberModule, FormsModule],
  template: `<app-dnd-card title="Coins">
    <div class="grid grid-cols-5 gap-4">
      <div class="flex flex-col items-center gap-2">
        <label for="cp" class="text-center">CP</label>
        <p-inputnumber
          [ngModel]="coinsInfo().cp"
          (ngModelChange)="state.updateState({ cp: $event })"
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
          [ngModel]="coinsInfo().sp"
          (ngModelChange)="state.updateState({ sp: $event })"
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
          [ngModel]="coinsInfo().ep"
          (ngModelChange)="state.updateState({ ep: $event })"
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
          [ngModel]="coinsInfo().gp"
          (ngModelChange)="state.updateState({ gp: $event })"
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
          [ngModel]="coinsInfo().pp"
          (ngModelChange)="state.updateState({ pp: $event })"
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
  state = inject(CoinsState);
  private readonly injector = inject(Injector);
  private readonly formService = inject(DynamicFormService);

  coinsInfo = this.state.state;
  control = new FormControl<CoinsInfo>(this.coinsInfo());

  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.coinsInfo());
      },
      { injector: this.injector },
    );
    this.formService.addControl('coins', this.control);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('coins');
  }
}
