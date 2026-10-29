import { Injectable, signal } from '@angular/core';
import { ComponentState } from '@app/core/state/component-state';
import { SpellSlotInfo } from './model/spell-slot-info';

@Injectable({
  providedIn: 'root',
})
export class SpellSlotsState extends ComponentState<SpellSlotInfo[]> {
  protected override _defaultState: SpellSlotInfo[] = Array.from({ length: 9 }, (_, i) => ({
    level: i + 1,
    expanded: 0,
    total: 0,
  }));

  protected override _state = signal(this._defaultState);
}
