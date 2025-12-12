import { Injectable, signal } from '@angular/core';
import { ClassType, SubclassType } from '@data/enums';
import { CharacterInfo } from './info';
import { StateRepository } from '@app/core/abstract/state.repository';

@Injectable({
  providedIn: 'root',
})
export class InfoState extends StateRepository<CharacterInfo> {
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
