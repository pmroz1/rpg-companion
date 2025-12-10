import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Checkbox, CheckboxChangeEvent } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormsModule } from '@angular/forms';
import { DynamicFormService } from '@app/shared/services';

export interface HitpointsInputs {
  hitpointsTemp: number;
  hitpointsCurrent: number;
  hitpointsMax: number;
  hitDiceSpent: number;
  hitDiceMax: number;
  deathSaveSuccesses: number;
  deathSaveFailures: number;
}
@Component({
  selector: 'app-hitpoints',
  imports: [DndCard, Checkbox, InputNumberModule, FloatLabelModule, FormsModule],
  template: `<app-dnd-card title="Hitpoints">
    <div class="flex flex-col-3 gap-5">
      <div class="flex flex-col  items-center">
        <h3>Hitpoints</h3>

        <div class="grid gap-2 mt-2">
          <div class="row-1 col-2">
            <label for="temp" class="block mb-1">Temp</label>
            <!-- TODO: create a custom style class for number-inputs -->
            <input
              pInputText
              id="temp"
              type="number"
              placeholder="0"
              min="0"
              [(ngModel)]="hitpointsInputs().hitpointsTemp"
              class="w-15"
              style="background-color: #1a1410;"
            />
          </div>

          <div class="row-2 col-1">
            <label for="current" class="block mb-1">Current</label>
            <input
              pInputText
              id="current"
              type="number"
              placeholder="0"
              min="0"
              [(ngModel)]="hitpointsInputs().hitpointsCurrent"
              class="w-15"
              style="background-color: #1a1410;"
            />
          </div>
          <div class="row-2 col-2">
            <label for="max" class="block mb-1">Max</label>
            <input
              pInputText
              id="max"
              type="number"
              placeholder="0"
              min="0"
              (ngModel)="hitpointsInputs().hitpointsMax"
              class="w-15"
              style="background-color: #1a1410;"
            />
          </div>
        </div>
      </div>
      <div class="dnd-divider-vertical"></div>
      <div class="col-1 items-center">
        <h3>Hit Dice</h3>

        <div class="grid gap-2 mt-2">
          <div class="row-1">
            <label for="spent" class="block mb-1">Spent</label>
            <input
              pInputText
              id="spent"
              type="number"
              placeholder="0"
              min="0"
              [(ngModel)]="hitpointsInputs().hitDiceSpent"
              class="w-15"
              style="background-color: #1a1410;"
            />
          </div>

          <div class="row-2">
            <label for="hitDiceMax" class="block mb-1">Max</label>
            <input
              pInputText
              id="hitDiceMax"
              type="number"
              placeholder="0"
              min="0"
              [(ngModel)]="hitpointsInputs().hitDiceMax"
              class="w-15"
              style="background-color: #1a1410;"
            />
          </div>
        </div>
      </div>
      <div class="dnd-divider-vertical"></div>
      <div class="col-1  items-center">
        <h3>Death Saves</h3>

        <div class="grid gap-2">
          <div class="row-1 mt-2">
            <label class="block mb-1">Successes</label>
            <div class="flex flex-row gap-2">
              @for (i of [].constructor(3); track $index) {
                <p-checkbox
                  (onChange)="onDeathSaveSuccessChange($event)"
                  binary="true"
                  [disabled]="
                    hitpointsInputs().deathSaveSuccesses < $index ||
                    hitpointsInputs().deathSaveSuccesses > $index + 1
                  "
                  checkboxIcon="pi pi-circle-fill"
                ></p-checkbox>
              }
            </div>
          </div>

          <div class="row-2 mt-2">
            <label class="block mb-1">Failures</label>
            <div class="flex flex-row gap-2">
              @for (i of [].constructor(3); track $index) {
                <p-checkbox
                  (onChange)="onDeathSaveFailureChange($event)"
                  binary="true"
                  [disabled]="
                    hitpointsInputs().deathSaveFailures < $index ||
                    hitpointsInputs().deathSaveFailures > $index + 1
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
  hitpointsInputs = signal<HitpointsInputs>({
    hitpointsTemp: 0,
    hitpointsCurrent: 0,
    hitpointsMax: 0,
    hitDiceSpent: 0,
    hitDiceMax: 0,
    deathSaveSuccesses: 0,
    deathSaveFailures: 0,
  });
  private readonly formService = inject(DynamicFormService);
  control = new FormControl<HitpointsInputs>(this.hitpointsInputs());

  onDeathSaveSuccessChange($event: CheckboxChangeEvent) {
    if ($event.checked) {
      this.hitpointsInputs.update((inputs) => ({
        ...inputs,
        deathSaveSuccesses: inputs.deathSaveSuccesses + 1,
      }));
    } else {
      this.hitpointsInputs.update((inputs) => ({
        ...inputs,
        deathSaveSuccesses: inputs.deathSaveSuccesses - 1,
      }));
    }
    this.control.setValue(this.hitpointsInputs());
  }
  onDeathSaveFailureChange($event: CheckboxChangeEvent) {
    if ($event.checked) {
      this.hitpointsInputs.update((inputs) => ({
        ...inputs,
        deathSaveFailures: inputs.deathSaveFailures + 1,
      }));
    } else {
      this.hitpointsInputs.update((inputs) => ({
        ...inputs,
        deathSaveFailures: inputs.deathSaveFailures - 1,
      }));
    }
    this.control.setValue(this.hitpointsInputs());
  }

  ngOnInit(): void {
    this.formService.addControl('hitpoints', this.control);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('hitpoints');
  }
}
