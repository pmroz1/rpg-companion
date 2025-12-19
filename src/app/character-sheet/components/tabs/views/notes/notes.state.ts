import { Injectable, signal } from '@angular/core';
import { ComponentState } from '@app/core/state/component-state';

@Injectable({
  providedIn: 'root',
})
export class NotesState extends ComponentState<string> {
  protected override _defaultState = '';

  protected override _state = signal(this._defaultState);
}
