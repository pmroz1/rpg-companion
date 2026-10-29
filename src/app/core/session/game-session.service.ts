import { Injectable, signal } from '@angular/core';
import { CharacterInfo } from '@app/character-sheet/components/info/model/character-info';

export interface GameSession {
  name: string;
  playerCharacters: CharacterInfo[];
}

function isCharacterInfo(value: unknown): value is CharacterInfo {
  if (typeof value !== 'object' || value === null) return false;
  const c = value as Record<string, unknown>;
  return (
    typeof c['name'] === 'string' &&
    c['name'].trim().length > 0 &&
    typeof c['background'] === 'string' &&
    typeof c['race'] === 'string' &&
    typeof c['level'] === 'number' &&
    typeof c['xp'] === 'number'
  );
}

export function isGameSession(value: unknown): value is GameSession {
  if (typeof value !== 'object' || value === null) return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s['name'] === 'string' &&
    s['name'].trim().length > 0 &&
    Array.isArray(s['playerCharacters']) &&
    s['playerCharacters'].every(isCharacterInfo)
  );
}

export function parseGameSession(text: string): GameSession {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error('This file is not valid JSON.');
  }
  if (!isGameSession(value)) {
    throw new Error('Invalid session format.');
  }
  return value;
}

@Injectable({
  providedIn: 'root',
})
export class GameSessionService {
  private readonly _localStorageKey = 'game_session_data';
  private readonly sessionData = signal<GameSession | null>(null);
  readonly session = this.sessionData.asReadonly();

  constructor() {
    const savedSession = localStorage.getItem(this._localStorageKey);
    if (savedSession) {
      try {
        this.sessionData.set(parseGameSession(savedSession));
      } catch (error) {
        console.error('Failed to parse saved game session data:', error);
      }
    }
  }

  setSession(session: GameSession): void {
    if (!isGameSession(session)) {
      throw new Error('Invalid session data.');
    }
    localStorage.setItem(this._localStorageKey, JSON.stringify(session));
    this.sessionData.set(session);
  }

  clearSession(): void {
    localStorage.removeItem(this._localStorageKey);
    this.sessionData.set(null);
  }

  updateSession(partialSession: Partial<GameSession>): void {
    const currentSession = this.sessionData();
    if (currentSession) {
      this.setSession({ ...currentSession, ...partialSession });
    }
  }
}
