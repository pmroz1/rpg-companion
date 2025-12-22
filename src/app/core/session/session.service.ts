import { Injectable, WritableSignal } from '@angular/core';

export interface GameSession {
  name: string;
  playerCharacters: CharacterInfo[];
}
@Injectable({
  providedIn: 'root',
})
export class GameSessionService {
  private sessionData: WritableSignal<Record<string, GameSession>> = {} as WritableSignal<
    Record<string, unknown>
  >;

  get session(): unknown {
    return this.sessionData;
  }
}
