import { Injectable, signal } from '@angular/core';
import { SpellcastingAbilityProps } from './spellcasting-ability';

@Injectable({
  providedIn: 'root',
})
export class SpellcastingAbilityState {
  default: SpellcastingAbilityProps = {
    spellcastingAbility: '',
    spellcastingModifier: 0,
    spellSaveDC: 0,
    spellAttackBonus: 0,
  };

  private readonly _spellcastingAbilityProps = signal<SpellcastingAbilityProps>(this.default);
  readonly spellcastingAbilityProps = this._spellcastingAbilityProps.asReadonly();

  setSpellcastingAbilityProps(props: SpellcastingAbilityProps): void {
    this._spellcastingAbilityProps.set(props);
  }

  updateSpellcastingAbilityProps(partialProps: Partial<SpellcastingAbilityProps>): void {
    this._spellcastingAbilityProps.set({
      ...this._spellcastingAbilityProps(),
      ...partialProps,
    });
  }

  reset(): void {
    this._spellcastingAbilityProps.set(this.default);
  }
}
