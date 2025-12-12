import { Signal, WritableSignal } from '@angular/core';

export abstract class StateRepository<T> {
  protected abstract readonly _state: WritableSignal<T>;
  protected abstract readonly _defaultState: T;

  get state(): Signal<T> {
    return this._state.asReadonly();
  }

  setState(state: T): void {
    this._state.set(state);
  }

  updateState(partialState: Partial<T>): void {
    this._state.set({
      ...this._state(),
      ...partialState,
    });
  }

  resetState(): void {
    this._state.set(this._defaultState);
  }
}
