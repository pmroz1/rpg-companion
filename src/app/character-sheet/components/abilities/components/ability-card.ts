import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ability-card',
  template: `
    <div class="ability-card">
      {{ abilityName() }}: {{ abilityScore() }} :{{ calculatedModifier() }}
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbilityCard {
  abilityName = input.required<string>();
  abilityScore = input.required<number>();
  abilityModifier = input.required<number>();

  calculatedModifier(): number {
    return Math.floor((this.abilityScore() - 10) / 2);
  }
}
