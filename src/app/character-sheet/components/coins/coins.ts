import { ChangeDetectionStrategy, Component, inject, Injector } from '@angular/core';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { InputNumberModule } from 'primeng/inputnumber';
import { CoinsState } from './coints.state';
import { FormControl, FormsModule } from '@angular/forms';
import { CoinsInfo } from './models/coins-info';
@Component({
  selector: 'app-coins',
  imports: [DndCard, InputNumberModule, FormsModule],
  template: `<app-dnd-card title="Coins">
    <div class="grid grid-cols-6 gap-5">
      <p-inputnumber
        [ngModel]="coinsInfo().cp"
        (ngModelChange)="state.updateState({ cp: $event })"
        [showButtons]="true"
        buttonLayout="vertical"
        spinnerMode="vertical"
        inputId="vertical"
      >
        <ng-template class="w-2" #incrementbuttonicon>
          <span class="pi pi-plus"></span>
        </ng-template>
        <ng-template #decrementbuttonicon>
          <span class="pi pi-minus"></span>
        </ng-template>
      </p-inputnumber>
      <p-inputnumber
        [ngModel]="coinsInfo().sp"
        (ngModelChange)="state.updateState({ sp: $event })"
        [showButtons]="true"
        buttonLayout="vertical"
        spinnerMode="vertical"
        inputId="vertical"
      >
        <ng-template class="w-2" #incrementbuttonicon>
          <span class="pi pi-plus"></span>
        </ng-template>
        <ng-template #decrementbuttonicon>
          <span class="pi pi-minus"></span>
        </ng-template>
      </p-inputnumber>
      <p-inputnumber
        [ngModel]="coinsInfo().ep"
        (ngModelChange)="state.updateState({ ep: $event })"
        [showButtons]="true"
        buttonLayout="vertical"
        spinnerMode="vertical"
        inputId="vertical"
      >
        <ng-template class="w-2" #incrementbuttonicon>
          <span class="pi pi-plus"></span>
        </ng-template>
        <ng-template #decrementbuttonicon>
          <span class="pi pi-minus"></span>
        </ng-template>
      </p-inputnumber>
      <p-inputnumber
        [ngModel]="coinsInfo().gp"
        (ngModelChange)="state.updateState({ gp: $event })"
        [showButtons]="true"
        buttonLayout="vertical"
        spinnerMode="vertical"
        inputId="vertical"
      >
        <ng-template class="w-2" #incrementbuttonicon>
          <span class="pi pi-plus"></span>
        </ng-template>
        <ng-template #decrementbuttonicon>
          <span class="pi pi-minus"></span>
        </ng-template>
      </p-inputnumber>
      <p-inputnumber
        [ngModel]="coinsInfo().pp"
        (ngModelChange)="state.updateState({ pp: $event })"
        [showButtons]="true"
        buttonLayout="vertical"
        spinnerMode="vertical"
        inputId="vertical"
      >
        <ng-template class="w-2" #incrementbuttonicon>
          <span class="pi pi-plus"></span>
        </ng-template>
        <ng-template #decrementbuttonicon>
          <span class="pi pi-minus"></span>
        </ng-template>
      </p-inputnumber>
    </div>
  </app-dnd-card>`,
  styleUrl: './coins.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Coins {
  state = inject(CoinsState);
  private readonly injector = inject(Injector);
  private readonly formService = inject(DynamicFormService);

  coinsInfo = this.state.state;
  control = new FormControl<CoinsInfo>(this.coinsInfo());
}
