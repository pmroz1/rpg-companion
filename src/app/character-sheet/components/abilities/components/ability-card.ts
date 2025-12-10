import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';
import { AbilityFormDetail } from '../models/ability-form-details';
import { DND_SKILLS } from '@data/dictionaries';

@Component({
  selector: 'app-ability-card',
  template: `
    <div class="ability-card">
      <div class="ability-name">{{ ability()?.name }}</div>
      <div class="modifier-score-box">
        <div class="ability-modifier">
          {{ modifier() }}
        </div>
        <div class="ability-score">{{ ability()?.score }}</div>
      </div>
      <div class="saving-throw">
        <input type="checkbox" [checked]="ability()?.savingThrowProficient" />
        <span>Saving Throw</span>
      </div>
      <div class="skills">
        @for (skill of skills(); track skill) {
          <div class="proficency">
            <input type="checkbox" [checked]="ability()?.proficient" />
            <span></span>
          </div>
          <!--  input value-->
          <div class="ability-skill">{{ skill.name }}</div>
        }
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbilityCard {
  readonly ability = model<AbilityFormDetail>();
  readonly skills = computed(() =>
    DND_SKILLS.filter(
      (skill) =>
        skill.associatedAbility.trim().toLowerCase() ===
        (this.ability()?.name ?? '').trim().toLowerCase(),
    ),
  );

  readonly modifier = computed(() => {
    const modifier = Math.floor(((this.ability()?.score ?? 0) - 10) / 2);
    return `${modifier > 0 ? '+' : ''}${modifier}`;
  });
}
