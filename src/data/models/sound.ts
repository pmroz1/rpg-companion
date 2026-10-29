import { WritableSignal } from '@angular/core';

export interface Sound {
  name: WritableSignal<string>;
  audio: HTMLAudioElement;
  playing: WritableSignal<boolean>;
  volume: WritableSignal<number>;
}
