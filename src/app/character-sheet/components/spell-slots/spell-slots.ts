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
export interface SpellSlotInfo {
  level: number;
  total: number;
  expanded: number;
}
@Component({
  selector: 'app-spell-slots',
  imports: [DndCard, CheckboxModule, TableModule, ReactiveFormsModule, FormsModule, ButtonModule],
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
                <input
                  [value]="this.spellSlots()[row.level - 1].total"
                  type="number"
                  min="0"
                  [max]="column.count"
                  (input)="onInputChange($event, row.level - 1, column.count)"
                  class="w-full"
                />
              </td>

              <td>
                <div class="flex flex-row gap-1">
                  @for (i of [].constructor(row.count); track $index) {
                    <p-checkbox
                      class="mr-0.5"
                      [binary]="true"
                      [disabled]="
                        ($index > 0 && !isCheckboxChecked(row.level, $index - 1)) ||
                        isCheckboxChecked(row.level, $index + 1) ||
                        this.spellSlots()[row.level - 1].total < $index + 1 ||
                        this.spellSlots()[row.level - 1].total == 0
                      "
                      [ngModel]="$index < this.spellSlots()[row.level - 1].expanded"
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

  spellSlots = signal<SpellSlotInfo[]>(
    Array.from({ length: 9 }, (_, i) => ({ level: i + 1, expanded: 0, total: 0 })),
  );
  reset() {
    this.spellSlots.set(
      Array.from({ length: 9 }, (_, i) => ({
        level: i + 1,
        expanded: 0,
        total: this.spellSlots()[i].total,
      })),
    );
    this.updateControl();
  }
  control = new FormControl<SpellSlotInfo[]>([]);

  getColumnData(column: { level: number; count: number }[]) {
    return column;
  }

  isCheckboxChecked(level: number, checkboxIndex: number): boolean {
    const index = level - 1;
    return this.spellSlots()[index].expanded > checkboxIndex;
  }

  onInputChange(event: Event, index: number, maxCount: number) {
    const input = event.target as HTMLInputElement;
    var parsed = Number(input.value);
    if (parsed > maxCount) {
      input.value = maxCount.toString();
      parsed = maxCount;
    }
    const updatedSlots = [...this.spellSlots()];
    updatedSlots[index] = {
      ...updatedSlots[index],
      total: parsed,
      expanded: Math.min(updatedSlots[index].expanded, parsed),
    };
    this.spellSlots.set(updatedSlots);
    this.updateControl();
  }

  onCheckboxChange(level: number, checkboxIndex: number, checked: boolean) {
    const index = level - 1;
    const updatedSlots = [...this.spellSlots()];

    if (checked) {
      updatedSlots[index] = {
        ...updatedSlots[index],
        expanded: checkboxIndex + 1,
      };
    } else {
      updatedSlots[index] = {
        ...updatedSlots[index],
        expanded: checkboxIndex,
      };
    }

    this.spellSlots.set(updatedSlots);
    this.updateControl();
  }

  private updateControl = () => this.control.setValue(this.spellSlots());

  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.spellSlots());
      },
      { injector: this.injector },
    );

    this.formService.addControl('spellSlots', this.control);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('spellSlots');
  }
}
