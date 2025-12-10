import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { AbilityFormDetail } from '../models/ability-form-details';
import { DND_SKILLS } from '@data/dictionaries';

@Component({
  selector: 'app-ability-card',
  template: `
    <div class="ability-card">
      <!-- {{ abilityName() }}: {{ abilityScore() }} :{{ calculatedModifier() }} -->
      <div class="ability-name">{{ ability()?.name }}</div>
      <div class="modifier-score-box">
        <div class="ability-modifier">
          <!-- {{ ability()?.modifier >= 0 ? '+' : '' }}{{ ability()?.modifier }} -->
        </div>
        <div class="ability-score">{{ ability()?.score }}</div>
      </div>
      <div class="saving-throw">st</div>
      <div class="skills">
        @for (skill of skills(); track skill) {
          <!-- proficiency radio/checkbox -->
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
  ability = model<AbilityFormDetail>();
  readonly skills = computed(() =>
    DND_SKILLS.filter(
      (skill) =>
        skill.associatedAbility.trim().toLowerCase() ===
        (this.ability()?.name ?? '').trim().toLowerCase(),
    ),
  );

  calculatedModifier(): number {
    return Math.floor(((this.ability()?.score ?? 0) - 10) / 2);
  }
}
