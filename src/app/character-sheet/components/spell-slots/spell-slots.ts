import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { deepEqual } from '@app/shared/utils/deep-equal';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumber } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { SpellSlotInfo } from './model/spell-slot-info';
import { SpellSlotsState } from './spell-slots.state';

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
    <div class="grid grid-cols-3" [formGroup]="form">
      <ng-container formArrayName="spellSlots">
        @for (column of spellDefaultConfig; track $index) {
          <p-table [value]="column" size="small">
            <ng-template pTemplate="header">
              <tr>
                <th>Level</th>
                <th>Total</th>
                <th>Expanded</th>
              </tr>
            </ng-template>

            <ng-template pTemplate="body" let-row>
              <tr [formGroupName]="row.level - 1">
                <td>Lvl {{ row.level }}</td>

                <td>
                  <p-input-number
                    formControlName="total"
                    type="number"
                    [max]="row.count"
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
                        [ngModel]="isCheckboxChecked(row.level, $index)"
                        (ngModelChange)="onCheckboxChange(row.level, $index, $event)"
                        [ngModelOptions]="{ standalone: true }"
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
      </ng-container>
    </div>
    <div class="mt-5 flex flex-row items-right">
      <p-button class="mr-1 ml-auto" (click)="reset()">Reset</p-button>
    </div>
  </app-dnd-card>`,
  styleUrl: './spell-slots.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellSlots implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  readonly state = inject(SpellSlotsState);
  spellSlotsState = this.state.state;
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

  form = new FormGroup({
    spellSlots: new FormArray(
      Array.from(
        { length: 9 },
        (_, i) =>
          new FormGroup({
            level: new FormControl<number>(i + 1, { nonNullable: true }),
            total: new FormControl<number>(0, { nonNullable: true }),
            expanded: new FormControl<number>(0, { nonNullable: true }),
          }),
      ),
    ),
  });

  get spellSlotsArray() {
    return this.form.controls.spellSlots as FormArray;
  }

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (value.spellSlots) {
        const slots = value.spellSlots as SpellSlotInfo[];
        this.state.setState(slots);
      }
    });

    this.spellSlotsArray.controls.forEach((control) => {
      control
        .get('total')
        ?.valueChanges.pipe(takeUntilDestroyed())
        .subscribe((total) => {
          const expandedControl = control.get('expanded');
          if (expandedControl && expandedControl.value > total) {
            expandedControl.setValue(total, { emitEvent: false });
          }
        });
    });

    effect(() => {
      const stateValue = this.spellSlotsState();
      if (!deepEqual(this.form.value.spellSlots, stateValue)) {
        this.form.patchValue({ spellSlots: stateValue }, { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.formService.addControl('spellSlots', this.form);
  }

  reset() {
    this.state.resetState();
  }

  isDisabledCheckbox(level: number, index: number): boolean {
    const slotIndex = level - 1;
    const slotControl = this.spellSlotsArray.at(slotIndex);
    const total = slotControl?.get('total')?.value ?? 0;
    const expanded = slotControl?.get('expanded')?.value ?? 0;

    const isNextToCheck = index === expanded;
    const isLastChecked = index === expanded - 1;

    if (index >= total) return true;

    return !(isNextToCheck || isLastChecked);
  }

  isCheckboxChecked(level: number, checkboxIndex: number): boolean {
    const index = level - 1;
    const expanded = this.spellSlotsArray.at(index)?.get('expanded')?.value ?? 0;
    return expanded > checkboxIndex;
  }

  onCheckboxChange(level: number, checkboxIndex: number, checked: boolean) {
    const index = level - 1;
    const control = this.spellSlotsArray.at(index);

    if (checked) {
      control?.patchValue({ expanded: checkboxIndex + 1 });
    } else {
      control?.patchValue({ expanded: checkboxIndex });
    }
  }

  ngOnDestroy(): void {
    this.formService.removeControl('spellSlots');
  }
}
