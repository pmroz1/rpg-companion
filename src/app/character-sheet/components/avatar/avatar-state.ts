import { Injectable, signal } from '@angular/core';
import { ComponentState } from '@app/core/state/component-state';

@Injectable({
  providedIn: 'root',
})
export class AvatarState extends ComponentState<string> {
  protected override _defaultState = '/images/silhouette.png';

  protected override _state = signal(this._defaultState);
}
