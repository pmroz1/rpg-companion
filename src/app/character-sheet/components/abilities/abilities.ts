import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/core/form';
import { AbilityType } from '@data/enums';
import { AbilitiesState } from './abilities.state';
import { AbilitiesInfo } from './models/abilities-info';
import { AbilityComponent } from './ability/ability';
import { DND_SKILLS } from '@data/dictionaries';

@Component({
  selector: 'app-abilities',
  imports: [DndCard, ReactiveFormsModule, AbilityComponent],
  template: `
    <app-dnd-card title="Abilities" class="h-full">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-2" [formGroup]="form">
        @for (ability of abilities; track ability.key) {
          <app-ability [abilityType]="ability.key" [form]="getAbilityForm(ability.key)">
          </app-ability>
        }
      </div>
    </app-dnd-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Abilities implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  readonly state = inject(AbilitiesState);

  abilities = Object.values(AbilityType).map((type) => ({
    key: type,
    value: type,
  }));

  form = new FormGroup({
    [AbilityType.Strength]: this.createAbilityGroup(AbilityType.Strength),
    [AbilityType.Dexterity]: this.createAbilityGroup(AbilityType.Dexterity),
    [AbilityType.Constitution]: this.createAbilityGroup(AbilityType.Constitution),
    [AbilityType.Intelligence]: this.createAbilityGroup(AbilityType.Intelligence),
    [AbilityType.Wisdom]: this.createAbilityGroup(AbilityType.Wisdom),
    [AbilityType.Charisma]: this.createAbilityGroup(AbilityType.Charisma),
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.state.setState(value as AbilitiesInfo);
    });

    effect(() => {
      const stateValue = this.state.state();
      if (stateValue) {
        this.form.patchValue(stateValue, { emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.formService.addControl('abilities', this.form);
  }

  ngOnDestroy() {
    this.formService.removeControl('abilities');
  }

  getAbilityForm(key: string): FormGroup {
    return this.form.get(key) as FormGroup;
  }

  private createAbilityGroup(type: AbilityType): FormGroup {
    const skills = DND_SKILLS.filter((s) => s.associatedAbility === type);
    const skillsGroup = new FormGroup({});
    skills.forEach((skill) => {
      skillsGroup.addControl(
        skill.id,
        new FormGroup({
          proficient: new FormControl(false, { nonNullable: true }),
          value: new FormControl<number | null>(null),
        }),
      );
    });

    return new FormGroup({
      score: new FormControl(10, { nonNullable: true }),
      savingThrow: new FormGroup({
        proficient: new FormControl(false, { nonNullable: true }),
        value: new FormControl<number | null>(null),
      }),
      skills: skillsGroup,
    });
  }
}
