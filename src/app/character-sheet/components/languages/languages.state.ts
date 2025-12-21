import { Injectable, signal } from '@angular/core';
import { ComponentState } from '@app/core/state/component-state';
import { LanguagesInfo } from './models/languages-info';

@Injectable({
  providedIn: 'root',
})
export class LanguageState extends ComponentState<LanguagesInfo> {
  protected override _defaultState: LanguagesInfo = {
    knownLanguages: [],
  };
  protected override _state = signal(this._defaultState);
}
