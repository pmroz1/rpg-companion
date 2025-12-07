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
export interface SpellSlotInfo {
  level: number;
  total: number;
  extended: number;
}
@Component({
  selector: 'app-spell-slots',
  imports: [DndCard, CheckboxModule, TableModule, ReactiveFormsModule],
  template: `<app-dnd-card title="Spell slots">
    <div class="grid grid-cols-3">
      @for (column of spellDefaultConfig; track $index) {
        <p-table [value]="column" size="small">
          <ng-template pTemplate="header">
            <tr>
              <th>Level</th>
              <th>Total</th>
              <th>Extended</th>
            </tr>
          </ng-template>

          <ng-template pTemplate="body" let-row>
            <tr>
              <td>Lvl {{ row.level }}</td>

              <td>
                <input
                  [value]="0"
                  type="number"
                  min="0"
                  max="10"
                  (input)="onInputChange($event, row.level - 1)"
                  class="w-full"
                />
              </td>

              <td>
                <div class="flex flex-row gap-1">
                  @for (i of [].constructor(row.count); track $index) {
                    <p-checkbox
                      [binary]="true"
                      [disabled]="
                        ($index > 0 && !isCheckboxChecked(row.level, $index - 1)) ||
                        isCheckboxChecked(row.level, $index + 1)
                      "
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
    Array.from({ length: 9 }, (_, i) => ({ level: i + 1, extended: 0, total: 0 })),
  );

  control = new FormControl<SpellSlotInfo[]>([]);

  getColumnData(column: { level: number; count: number }[]) {
    return column;
  }

  isCheckboxChecked(level: number, checkboxIndex: number): boolean {
    const index = level - 1;
    return this.spellSlots()[index].extended > checkboxIndex;
  }

  onInputChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const parsed = Number(input.value);
    if (parsed < 0 || parsed > 10) {
      input.value = '0';
      return;
    }
    const updatedSlots = [...this.spellSlots()];
    updatedSlots[index] = { ...updatedSlots[index], total: parsed };
    this.spellSlots.set(updatedSlots);
    this.updateControl();
  }

  onCheckboxChange(level: number, checkboxIndex: number, checked: boolean) {
    const index = level - 1;
    const updatedSlots = [...this.spellSlots()];

    if (checked) {
      updatedSlots[index] = {
        ...updatedSlots[index],
        extended: checkboxIndex + 1,
      };
    } else {
      updatedSlots[index] = {
        ...updatedSlots[index],
        extended: checkboxIndex,
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
