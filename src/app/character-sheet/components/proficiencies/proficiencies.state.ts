import { Injectable, signal } from '@angular/core';
import { ComponentState } from '@app/core/state/component-state';
import { ProficienciesInfo } from './model/proficiencies-info';

@Injectable({
  providedIn: 'root',
})
export class ProficienciesState extends ComponentState<ProficienciesInfo> {
  protected override _defaultState: ProficienciesInfo = {
    armorTrainingTypes: [],
    weapons: [],
    tools: [],
  };

  protected override _state = signal(this._defaultState);
}
