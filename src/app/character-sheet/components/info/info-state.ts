import { Injectable, signal } from '@angular/core';
import { ClassType, SubclassType } from '@data/enums';
import { CharacterInfo } from './info';

@Injectable({
  providedIn: 'root',
})
export class InfoState {
  default: CharacterInfo = {
    name: '',
    background: '',
    race: '',
    class: ClassType.None,
    subclass: SubclassType.None,
    level: 1,
    xp: 0,
  };

  private readonly _characterInfo = signal<CharacterInfo>(this.default);
  readonly characterInfo = this._characterInfo.asReadonly();

  setCharacterInfo(info: CharacterInfo): void {
    this._characterInfo.set(info);
  }

  updateCharacterInfo(partialInfo: Partial<CharacterInfo>): void {
    this._characterInfo.set({
      ...this._characterInfo(),
      ...partialInfo,
    });
  }

  reset(): void {
    this._characterInfo.set(this.default);
  }
}
