import { Injectable, signal } from '@angular/core';
import { ComponentState } from '@app/core/state/component-state';
import { BackstoryInfo } from './models/backstory-info';

@Injectable({
  providedIn: 'root',
})
export class BackstoryState extends ComponentState<BackstoryInfo> {
  protected override _defaultState: BackstoryInfo = {
    backstoryPersonality: '',
    alignment: '',
  };
  protected override _state = signal(this._defaultState);
}
