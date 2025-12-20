import { Injectable, signal } from '@angular/core';
import { ComponentState } from '@app/core/state/component-state';
import { CoinsInfo } from './models/coins-info';

@Injectable({
  providedIn: 'root',
})
export class CoinsState extends ComponentState<CoinsInfo> {
  protected override _defaultState: CoinsInfo = {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 0,
    pp: 0,
  };
  protected override _state = signal(this._defaultState);
}
