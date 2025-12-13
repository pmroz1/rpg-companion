import { Injectable, signal } from '@angular/core';
import { ComponentState } from '@app/core/state';
import { SpellCantrip } from '@data/models';

@Injectable({
  providedIn: 'root',
})
export class SpellCantripsState extends ComponentState<SpellCantrip[]> {
  protected override _defaultState: SpellCantrip[] = [];

  protected override _state = signal(this._defaultState);

  override updateState(newState: SpellCantrip[]): void {
    this._state.set(newState);
  }
}
