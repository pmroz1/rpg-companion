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
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { FormControl } from '@angular/forms';
import { DynamicFormService } from '@app/shared/services';
import { JsonPipe } from '@angular/common';
import { count } from 'rxjs';
export interface SpellSlotInfo {
  level: number;
  count: number;
}
@Component({
  selector: 'app-spell-slots',
  imports: [DndCard, CheckboxModule, JsonPipe],
  template: `<app-dnd-card title="Spell slots">
    <div class="grid grid-cols-3 gap-4">
      @for (column of kurwa; track $index) {
        <div class="flex flex-col gap-2">
          @for (row of column; track row.level) {
            <div class="flex flex-row items-center gap-3">
              <p>Level {{ row.level }}:</p>

              @for (i of [].constructor(row.count); track $index) {
                <p-checkbox
                  [value]="'level-' + row.level + '-' + $index"
                  [inputId]="'level-' + row.level + '-' + $index"
                  [name]="'level-' + row.level + '-' + $index"
                  binary="true"
                  (onChange)="onCheckboxLevelChange(row.level, $event)"
                  checkboxIcon="pi pi-circle-fill"
                />
              }
            </div>
          }
        </div>
      }
      {{ spellSlots() | json }}
    </div>
  </app-dnd-card>`,
  styleUrl: './spell-slots.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellSlots implements OnInit, OnDestroy {
  private readonly injector = inject(Injector);
  private readonly formService = inject(DynamicFormService);
  kurwa = [
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
    Array.from({ length: 9 }, (_, i) => ({ level: i + 1, count: 0 })),
  );

  control = new FormControl<SpellSlotInfo[]>([]);
  onCheckboxLevelChange(level: number, event: any) {
    var index = level - 1;
    event.checked ? this.increaseSpellSlot(index) : this.decreaseSpellSlot(index);
    this.control.setValue(this.spellSlots());
  }
  decreaseSpellSlot(index: number) {
    const currentCount = this.spellSlots()[index].count;
    if (currentCount > 0) {
      const updatedSlots = [...this.spellSlots()];
      updatedSlots[index] = { ...updatedSlots[index], count: currentCount - 1 };
      this.spellSlots.set(updatedSlots);
    }
  }
  increaseSpellSlot(index: number) {
    const updatedSlots = [...this.spellSlots()];
    updatedSlots[index] = {
      level: updatedSlots[index].level,
      count: updatedSlots[index].count + 1,
    };
    this.spellSlots.set(updatedSlots);
  }

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
