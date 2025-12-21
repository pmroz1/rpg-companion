import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '@app/shared/services';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { SpellSlotsState } from './spell-slots.state';
import { SpellSlotInfo } from './model/spell-slot-info';

@Component({
  selector: 'app-spell-slots',
  imports: [
    DndCard,
    CheckboxModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputNumber,
  ],
  template: `<app-dnd-card title="Spell slots">
    <div class="grid grid-cols-3">
      @for (column of spellDefaultConfig; track $index) {
        <p-table [value]="column" size="small">
          <ng-template pTemplate="header">
            <tr>
              <th>Level</th>
              <th>Total</th>
              <th>Expanded</th>
            </tr>
          </ng-template>

          <ng-template pTemplate="body" let-row let-column>
            <tr>
              <td>Lvl {{ row.level }}</td>

              <td>
                <p-input-number
                  [ngModel]="this.spellSlotsState()[row.level - 1].total"
                  type="number"
                  [max]="column.count"
                  (ngModelChange)="onInputChange($event, row.level - 1, column.count)"
                  inputStyleClass="w-10 h-8"
                />
              </td>
              <td>
                <div class="flex flex-row gap-1">
                  @for (i of [].constructor(row.count); track $index) {
                    <p-checkbox
                      class="mr-0.5"
                      [binary]="true"
                      [disabled]="isDisabledCheckbox(row.level, $index)"
                      [ngModel]="$index < this.spellSlotsState()[row.level - 1].expanded"
                      (onChange)="onCheckboxChange(row.level, $index, $event.checked)"
                      [inputId]="'level-' + row.level + '-' + $index"
                      checkboxIcon="pi pi-circle-fill"
                    />
                  }
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      }
    </div>
    <div class="mt-5 flex flex-row items-right">
      <p-button class="mr-1 ml-auto" (click)="reset()">Reset</p-button>
    </div>
  </app-dnd-card>`,
  styleUrl: './spell-slots.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellSlots implements OnInit, OnDestroy {
  private readonly injector = inject(Injector);
  private readonly formService = inject(DynamicFormService);
  readonly state = inject(SpellSlotsState);

  spellSlotsState = this.state.state;
  control = new FormControl<SpellSlotInfo[]>(this.spellSlotsState());

  spellDefaultConfig = [
    [
      { level: 1, count: 4 },
      { level: 2, count: 3 },
      { level: 3, count: 3 },
    ],
    [
      { level: 4, count: 4 },
      { level: 5, count: 3 },
      { level: 6, count: 2 },
    ],
    [
      { level: 7, count: 2 },
      { level: 8, count: 1 },
      { level: 9, count: 1 },
    ],
  ];

  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.spellSlotsState());
      },
      { injector: this.injector },
    );
    this.formService.addControl('spellSlots', this.control);
  }

  reset() {
    this.state.resetState();
  }

  isDisabledCheckbox(level: number, index: number): boolean {
    return (
      (index > 0 && !this.isCheckboxChecked(level, index - 1)) ||
      this.isCheckboxChecked(level, index + 1) ||
      this.spellSlotsState()[level - 1].total < index + 1 ||
      this.spellSlotsState()[level - 1].total === 0
    );
  }

  getColumnData(column: { level: number; count: number }[]) {
    return column;
  }

  isCheckboxChecked(level: number, checkboxIndex: number): boolean {
    const index = level - 1;
    return this.spellSlotsState()[index].expanded > checkboxIndex;
  }

  onInputChange(event: number, index: number, maxCount: number) {
    if (event > maxCount) {
      event = maxCount;
    }
    const newState = [...this.spellSlotsState()];
    newState[index] = {
      ...newState[index],
      expanded: Math.min(newState[index].expanded, event),
      total: event,
    };
    this.state.setState(newState);
  }

  onCheckboxChange(level: number, checkboxIndex: number, checked: boolean) {
    const index = level - 1;
    const newState = [...this.spellSlotsState()];
    if (checked) {
      newState[index] = {
        ...newState[index],
        expanded: checkboxIndex + 1,
      };
    } else {
      newState[index] = {
        ...newState[index],
        expanded: checkboxIndex,
      };
    }
    this.state.setState(newState);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('spellSlots');
  }
}
