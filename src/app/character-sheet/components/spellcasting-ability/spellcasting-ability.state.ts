import { Injectable, signal, WritableSignal } from '@angular/core';
import { SpellcastingStats } from './model/spellcasting';
import { ComponentState } from '@app/core/state/component-state';

@Injectable({
  providedIn: 'root',
})
export class SpellcastingAbilityState extends ComponentState<SpellcastingStats> {
  protected override _defaultState: SpellcastingStats = {
    spellcastingAbility: '',
    spellcastingModifier: 0,
    spellSaveDC: 0,
    spellAttackBonus: 0,
  };

  protected override _state: WritableSignal<SpellcastingStats> = signal(this._defaultState);
}
