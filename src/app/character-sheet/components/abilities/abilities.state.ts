import { Injectable, signal } from '@angular/core';
import { ComponentState } from '@app/core/state/component-state';
import { AbilitiesInfo, DEFAULT_ABILITIES } from './models/abilities-info';

@Injectable({
  providedIn: 'root',
})
export class AbilitiesState extends ComponentState<AbilitiesInfo> {
  protected override _defaultState = DEFAULT_ABILITIES;
  protected override _state = signal(this._defaultState);
}
