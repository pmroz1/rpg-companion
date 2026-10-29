import { Injectable, signal } from '@angular/core';

import { ComponentState } from '@app/core/state/component-state';
import { HitpointsInfo } from './model/hitpoints-info';

@Injectable({
  providedIn: 'root',
})
export class HitpointsState extends ComponentState<HitpointsInfo> {
  protected override _defaultState: HitpointsInfo = {
    hitpointsTemp: 0,
    hitpointsCurrent: 0,
    hitpointsMax: 0,
    hitDiceSpent: 0,
    hitDiceMax: 0,
    deathSaveSuccesses: 0,
    deathSaveFailures: 0,
  };

  protected override _state = signal(this._defaultState);
}
