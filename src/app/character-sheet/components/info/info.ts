import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { DND_CLASSES, DND_SUBCLASSES } from '@data/dictionaries';
import { DND_BACKGROUNDS } from '@data/dictionaries/background.dictionary';
import { DND_RACES } from '@data/dictionaries/races.dictionary';
import { ClassType, SubclassType } from '@data/enums';
import { DndSubclass } from '@data/models';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InfoState } from './info.state';
import { LevelPlate } from './level-plate/level-plate';
import { CharacterInfo } from './model/character-info';

@Component({
  selector: 'app-info',
  imports: [
    DndCard,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    InputNumberModule,
    LevelPlate,
  ],
  template: `
    <div class="info-shell">
      <app-dnd-card title="Character Info" class="info-card">
        <div class="info-grid" [formGroup]="form">
          <div class="field col-span-2">
            <label for="name" class="field-label">Character Name</label>
            <input pInputText id="name" formControlName="name" placeholder="Enter character name" />
          </div>

          <div class="field">
            <label for="class-select" class="field-label">Class</label>
            <p-select
              id="class-select"
              [options]="classOptions"
              optionLabel="name"
              optionValue="id"
              formControlName="class"
              placeholder="Select a class"
            />
          </div>

          <div class="field">
            <label for="subclass" class="field-label">Subclass</label>
            <p-select
              id="subclass"
              [options]="subclassOptions()"
              formControlName="subclass"
              optionLabel="name"
              optionValue="id"
              placeholder="Select a subclass"
            />
          </div>

          <div class="field">
            <label for="race" class="field-label">Race</label>
            <p-select
              id="race"
              [options]="raceOptions"
              formControlName="race"
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
              formControlName="background"
              optionLabel="name"
              optionValue="id"
              placeholder="Select a background"
            />
          </div>
        </div>
      </app-dnd-card>
      <app-level-plate
        [level]="characterInfoState().level"
        [xp]="characterInfoState().xp"
        (event)="onLevelPlateChange($event)"
        class="level-plate"
      />
    </div>
  `,
  styleUrls: ['./info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Info implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  readonly state = inject(InfoState);

  classOptions = [...DND_CLASSES];
  subclassOptions = computed((): DndSubclass[] => {
    const currentClass = this.characterInfoState().class;
    return [...DND_SUBCLASSES.filter((s) => s.parentClass === currentClass)];
  });

  backgroundOptions = [...DND_BACKGROUNDS];
  raceOptions = [...DND_RACES];

  characterInfoState = this.state.state;

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    class: new FormControl<ClassType | null>(null),
    subclass: new FormControl<SubclassType | null>(null),
    race: new FormControl<string>('', { nonNullable: true }),
    background: new FormControl<string>('', { nonNullable: true }),
    level: new FormControl<number>(1, { nonNullable: true }),
    xp: new FormControl<number>(0, { nonNullable: true }),
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.state.updateState(value as Partial<CharacterInfo>);
    });

    this.form.controls.class.valueChanges.pipe(takeUntilDestroyed()).subscribe((classType) => {
      if (!classType) {
        this.form.controls.subclass.disable({ emitEvent: false });
      } else {
        this.form.controls.subclass.enable({ emitEvent: false });
      }
      this.form.controls.subclass.setValue(null);
    });

    effect(() => {
      const state = this.characterInfoState();
      this.form.patchValue(state, { emitEvent: false });

      if (!state.class) {
        this.form.controls.subclass.disable({ emitEvent: false });
      } else {
        this.form.controls.subclass.enable({ emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.formService.addControl('characterInfo', this.form);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('characterInfo');
  }

  onLevelPlateChange(event: { level: number; xp: number }) {
    this.form.patchValue(event);
  }
}
