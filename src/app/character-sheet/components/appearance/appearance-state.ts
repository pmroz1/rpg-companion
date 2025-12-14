import { Injectable, signal } from '@angular/core';
import { ComponentState } from '@app/core/state/component-state';

@Injectable({
  providedIn: 'root',
})
export class AppearanceState extends ComponentState<string> {
  protected override _defaultState: string = '';

  protected override _state = signal(this._defaultState);
}
