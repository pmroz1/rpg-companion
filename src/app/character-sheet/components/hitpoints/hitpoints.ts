import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { Checkbox } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { HitpointsState } from './hitpoints.state';
import { HitpointsInfo } from './model/hitpoints-info';

@Component({
  selector: 'app-hitpoints',
  imports: [
    DndCard,
    Checkbox,
    InputNumberModule,
    FloatLabelModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  template: `<app-dnd-card title="Hitpoints">
    <div class="flex flex-row gap-5 justify-center" [formGroup]="form">
      <div class="grid items-center">
        <h3>Hitpoints</h3>
        <div class="grid gap-2 mt-2">
          <div class="row-1 col-2">
            <span class="block mb-1">Temp</span>
            <p-input-number
              id="temp"
              placeholder="0"
              formControlName="hitpointsTemp"
              inputStyleClass="w-15 h-8"
            />
          </div>
          <div class="row-2 col-1">
            <span class="block mb-1">Current</span>
            <p-input-number
              id="current"
              placeholder="0"
              formControlName="hitpointsCurrent"
              inputStyleClass="w-15 h-8"
            />
          </div>
          <div class="row-2 col-2">
            <span class="block mb-1">Max</span>
            <p-input-number
              id="max"
              placeholder="0"
              formControlName="hitpointsMax"
              inputStyleClass="w-15 h-8"
            />
          </div>
        </div>
      </div>
      <div class="dnd-divider-vertical"></div>
      <div class="col-2 items-center">
        <h3>Hit Dice</h3>

        <div class="grid gap-2 mt-2">
          <div class="row-1">
            <span class="block mb-1">Spent</span>
            <p-input-number
              id="spent"
              placeholder="0"
              formControlName="hitDiceSpent"
              inputStyleClass="w-15 h-8"
            />
          </div>

          <div class="row-2">
            <span class="block mb-1">Max</span>
            <p-input-number
              id="hitDiceMax"
              placeholder="0"
              formControlName="hitDiceMax"
              inputStyleClass="w-15 h-8"
            />
          </div>
        </div>
      </div>
      <div class="dnd-divider-vertical"></div>
      <div class="col-1 items-center">
        <h3>Death Saves</h3>

        <div class="grid gap-2 mt-2">
          <div class="row-1">
            <span class="block mb-1">Successes</span>
            <div class="flex flex-row gap-2">
              @for (i of [].constructor(3); track $index) {
                <p-checkbox
                  [ngModel]="hitpointsState().deathSaveSuccesses > $index"
                  (ngModelChange)="updateDeathSaves('deathSaveSuccesses', $event)"
                  [ngModelOptions]="{ standalone: true }"
                  binary="true"
                  [disabled]="
                    hitpointsState().deathSaveSuccesses < $index ||
                    hitpointsState().deathSaveSuccesses > $index + 1
                  "
                  checkboxIcon="pi pi-circle-fill"
                ></p-checkbox>
              }
            </div>
          </div>

          <div class="row-2 mt-5">
            <span class="block mb-1">Failures</span>
            <div class="flex flex-row gap-2">
              @for (i of [].constructor(3); track $index) {
                <p-checkbox
                  [ngModel]="hitpointsState().deathSaveFailures > $index"
                  (ngModelChange)="updateDeathSaves('deathSaveFailures', $event)"
                  [ngModelOptions]="{ standalone: true }"
                  binary="true"
                  [disabled]="
                    hitpointsState().deathSaveFailures < $index ||
                    hitpointsState().deathSaveFailures > $index + 1
                  "
                  checkboxIcon="pi pi-circle-fill"
                ></p-checkbox>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-dnd-card>`,
  styleUrl: './hitpoints.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hitpoints implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  readonly state = inject(HitpointsState);

  hitpointsState = this.state.state;

  form = new FormGroup({
    hitpointsTemp: new FormControl<number>(0, { nonNullable: true }),
    hitpointsCurrent: new FormControl<number>(0, { nonNullable: true }),
    hitpointsMax: new FormControl<number>(0, { nonNullable: true }),
    hitDiceSpent: new FormControl<number>(0, { nonNullable: true }),
    hitDiceMax: new FormControl<number>(0, { nonNullable: true }),
    deathSaveSuccesses: new FormControl<number>(0, { nonNullable: true }),
    deathSaveFailures: new FormControl<number>(0, { nonNullable: true }),
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.state.updateState(value as Partial<HitpointsInfo>);
    });

    effect(() => {
      const stateValue = this.hitpointsState();
      if (JSON.stringify(this.form.value) !== JSON.stringify(stateValue)) {
        this.form.setValue(stateValue, { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.formService.addControl('hitpoints', this.form);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('hitpoints');
  }

  updateDeathSaves(field: 'deathSaveSuccesses' | 'deathSaveFailures', checked: boolean) {
    const currentValue = this.form.controls[field].value;
    const newValue = checked ? currentValue + 1 : currentValue - 1;
    const clampedValue = Math.min(3, Math.max(0, newValue));
    this.form.controls[field].setValue(clampedValue);
  }
}
