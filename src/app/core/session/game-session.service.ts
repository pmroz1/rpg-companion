import { effect, Injectable, Signal, signal } from '@angular/core';
import { CharacterInfo } from '@app/character-sheet/components/info/model/character-info';

export interface GameSession {
  name: string;
  playerCharacters: CharacterInfo[];
}

@Injectable({
  providedIn: 'root',
})
export class GameSessionService {
  private readonly _localStorageKey = 'game_session_data';
  private sessionData = signal<GameSession | null>(null);

  constructor() {
    const savedSession = localStorage.getItem(this._localStorageKey);
    if (savedSession) {
      try {
        const parsedSession: GameSession = JSON.parse(savedSession);
        this.sessionData.set(parsedSession);
      } catch (error) {
        console.error('Failed to parse saved game session data:', error);
      }
    }

    effect(() => {
      const session = this.sessionData();
      if (session) {
        localStorage.setItem(this._localStorageKey, JSON.stringify(session));
      } else {
        localStorage.removeItem(this._localStorageKey);
      }
    });
  }

  setSession(session: GameSession): void {
    this.sessionData.set(session);
  }

  clearSession(): void {
    this.sessionData.set(null);
  }

  get session(): Signal<GameSession | null> {
    return this.sessionData;
  }

  updateSession(partialSession: Partial<GameSession>): void {
    const currentSession = this.sessionData();
    if (currentSession) {
      this.sessionData.set({
        ...currentSession,
        ...partialSession,
      });
    } else {
      console.warn('No existing session to update. Use setSession to create a new session.');
    }
  }
}
