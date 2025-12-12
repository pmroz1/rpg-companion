import { Injectable, signal } from '@angular/core';
import { ClassType, SubclassType } from '@data/enums';
import { CharacterInfo } from './model/character-info';
import { ComponentState } from '@app/core/state/component-state';

@Injectable({
  providedIn: 'root',
})
export class InfoState extends ComponentState<CharacterInfo> {
  protected override _defaultState: CharacterInfo = {
    name: '',
    background: '',
    race: '',
    class: ClassType.None,
    subclass: SubclassType.None,
    level: 1,
    xp: 0,
  };

  protected override _state = signal<CharacterInfo>(this._defaultState);
}
