import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Injector,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { ClassType, SubclassType } from '@data/enums';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DND_CLASSES, DND_SUBCLASSES } from '@data/dictionaries';
import { DND_BACKGROUNDS } from '@data/dictionaries/background.dictionary';
import { DND_RACES } from '@data/dictionaries/races.dictionary';
import { LevelPlate } from './level-plate/level-plate';
import { InfoState } from './info-state';

export interface CharacterInfo {
  name: string;
  background: string;
  race: string;
  class: ClassType | null;
  subclass: SubclassType | null;
  level: number;
  xp: number;
}

@Component({
  selector: 'app-info',
  imports: [DndCard, FormsModule, SelectModule, InputTextModule, InputNumberModule, LevelPlate],
  template: `
    <div class="info-shell">
      <app-dnd-card title="Character Info" class="info-card">
        <div class="info-grid">
          <div class="field col-span-2">
            <label for="name" class="field-label">Character Name</label>
            <input
              pInputText
              id="name"
              [ngModel]="characterInfo().name"
              (ngModelChange)="state.updateCharacterInfo({ name: $event })"
              placeholder="Enter character name"
            />
          </div>

          <div class="field">
            <label for="class-select" class="field-label">Class</label>
            <p-select
              id="class-select"
              [options]="classOptions"
              optionLabel="name"
              optionValue="id"
              [ngModel]="characterInfo().class"
              (ngModelChange)="onClassChange($event)"
              placeholder="Select a class"
            />
          </div>

          <div class="field">
            <label for="subclass" class="field-label">Subclass</label>
            <p-select
              id="subclass"
              [options]="subclassOptions()"
              [ngModel]="characterInfo().subclass"
              (ngModelChange)="state.updateCharacterInfo({ subclass: $event })"
              optionLabel="name"
              optionValue="id"
              [disabled]="!characterInfo().class"
              placeholder="Select a subclass"
            />
          </div>

          <div class="field">
            <label for="race" class="field-label">Race</label>
            <p-select
              id="race"
              [options]="raceOptions"
              [ngModel]="characterInfo().race"
              (ngModelChange)="state.updateCharacterInfo({ race: $event })"
              optionLabel="name"
              optionValue="id"
              placeholder="Select a race"
            />
          </div>

          <div class="field">
            <label for="background" class="field-label">Background</label>
            <p-select
              id="background"
              [options]="backgroundOptions"
              [ngModel]="characterInfo().background"
              (ngModelChange)="state.updateCharacterInfo({ background: $event })"
              optionLabel="name"
              optionValue="id"
              placeholder="Select a background"
            />
          </div>
        </div>
      </app-dnd-card>
      <app-level-plate
        [level]="characterInfo().level"
        [xp]="characterInfo().xp"
        (event)="state.updateCharacterInfo($event)"
        class="level-plate"
      />
    </div>
  `,
  styleUrls: ['./info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Info implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  private readonly injector = inject(Injector);
  readonly state = inject(InfoState);

  classOptions = [...DND_CLASSES];
  subclassOptions = computed(() => {
    const currentClass = this.characterInfo().class;
    return [...DND_SUBCLASSES.filter((s) => s.parentClass === currentClass)];
  });

  backgroundOptions = [...DND_BACKGROUNDS];
  raceOptions = [...DND_RACES];

  characterInfo = this.state.characterInfo;

  control = new FormControl<CharacterInfo>(this.characterInfo());

  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.characterInfo());
      },
      { injector: this.injector },
    );

    this.formService.addControl('characterInfo', this.control);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('characterInfo');
  }

  onClassChange(classType: ClassType | null): void {
    this.state.setCharacterInfo({
      ...this.characterInfo(),
      class: classType,
      subclass: null,
    });
  }
}
