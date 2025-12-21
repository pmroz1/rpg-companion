import { Signal, WritableSignal } from '@angular/core';

export abstract class ComponentState<T> {
  protected abstract readonly _state: WritableSignal<T>;
  protected abstract readonly _defaultState: T;

  get state(): Signal<T> {
    return this._state.asReadonly();
  }

  setState(state: T): void {
    this._state.set(state);
  }

  updateState(partialState: Partial<T>): void {
    const currentState = this._state();
    if (typeof currentState === 'object' && currentState !== null && !Array.isArray(currentState)) {
      this._state.set({
        ...currentState,
        ...partialState,
      });
    } else {
      this._state.set(partialState as T);
    }
  }

  resetState(): void {
    this._state.set(this._defaultState);
  }
}
