import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Checkbox } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormsModule } from '@angular/forms';
import { DynamicFormService } from '@app/shared/services';
import { HitpointsInfo } from './model/hitpoints-info';
import { HitpointsState } from './hitpoints.state';

@Component({
  selector: 'app-hitpoints',
  imports: [DndCard, Checkbox, InputNumberModule, FloatLabelModule, FormsModule],
  template: `<app-dnd-card title="Hitpoints">
    <div class="flex flex-row gap-5 justify-center">
      <div class="grid items-center">
        <h3>Hitpoints</h3>
        <div class="grid gap-2 mt-2">
          <div class="row-1 col-2">
            <span class="block mb-1">Temp</span>
            <p-input-number
              id="temp"
              placeholder="0"
              [ngModel]="hitpointsInfo().hitpointsTemp"
              (ngModelChange)="state.updateState({ hitpointsTemp: $event })"
              inputStyleClass="w-15 h-8"
            />
          </div>
          <div class="row-2 col-1">
            <span class="block mb-1">Current</span>
            <p-input-number
              id="current"
              placeholder="0"
              [ngModel]="hitpointsInfo().hitpointsCurrent"
              (ngModelChange)="state.updateState({ hitpointsCurrent: $event })"
              inputStyleClass="w-15 h-8"
            />
          </div>
          <div class="row-2 col-2">
            <span class="block mb-1">Max</span>
            <p-input-number
              id="max"
              placeholder="0"
              [ngModel]="hitpointsInfo().hitpointsMax"
              (ngModelChange)="state.updateState({ hitpointsMax: $event })"
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
              [ngModel]="hitpointsInfo().hitDiceSpent"
              (ngModelChange)="state.updateState({ hitDiceSpent: $event })"
              inputStyleClass="w-15 h-8"
            />
          </div>

          <div class="row-2">
            <span class="block mb-1">Max</span>
            <p-input-number
              id="hitDiceMax"
              placeholder="0"
              [(ngModel)]="hitpointsInfo().hitDiceMax"
              (ngModelChange)="state.updateState({ hitDiceMax: $event })"
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
                  (onChange)="
                    state.updateState({
                      deathSaveSuccesses: $event.checked
                        ? hitpointsInfo().deathSaveSuccesses + 1
                        : hitpointsInfo().deathSaveSuccesses - 1,
                    })
                  "
                  binary="true"
                  [ngModel]="hitpointsInfo().deathSaveSuccesses > $index"
                  [disabled]="
                    hitpointsInfo().deathSaveSuccesses < $index ||
                    hitpointsInfo().deathSaveSuccesses > $index + 1
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
                  (onChange)="
                    state.updateState({
                      deathSaveFailures: $event.checked
                        ? hitpointsInfo().deathSaveFailures + 1
                        : hitpointsInfo().deathSaveFailures - 1,
                    })
                  "
                  binary="true"
                  [ngModel]="hitpointsInfo().deathSaveFailures > $index"
                  [disabled]="
                    hitpointsInfo().deathSaveFailures < $index ||
                    hitpointsInfo().deathSaveFailures > $index + 1
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
  state = inject(HitpointsState);
  private readonly injector = inject(Injector);
  private readonly formService = inject(DynamicFormService);

  hitpointsInfo = this.state.state;
  control = new FormControl<HitpointsInfo>(this.hitpointsInfo());

  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.hitpointsInfo());
      },
      { injector: this.injector },
    );
    this.formService.addControl('hitpoints', this.control);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('hitpoints');
  }
}
