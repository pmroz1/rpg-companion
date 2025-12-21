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

  /**
   * Merges partial state into the current state.
   * Note: This method is intended for object states.
   * For arrays, it will replace the entire array and log a warning. Use setState() for arrays.
   */
  updateState(partialState: Partial<T>): void {
    const currentState = this._state();
    if (typeof currentState === 'object' && currentState !== null && !Array.isArray(currentState)) {
      this._state.set({
        ...currentState,
        ...partialState,
      });
    } else {
      if (Array.isArray(currentState)) {
        console.warn(
          'ComponentState: updateState called on array state. This will replace the entire array. Use setState instead.',
        );
      }
      this._state.set(partialState as T);
    }
  }

  resetState(): void {
    this._state.set(this._defaultState);
  }
}
