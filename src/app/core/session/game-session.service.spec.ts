import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ClassType, SubclassType } from '@data/enums';
import { GameSessionService, parseGameSession } from './game-session.service';
import { sessionGuard } from './session.guard';

describe('GameSessionService & parseGameSession', () => {
  const validSession = {
    name: 'Campaign',
    playerCharacters: [
      {
        name: 'Aria',
        background: 'Sage',
        race: 'Elf',
        class: ClassType.Wizard,
        subclass: SubclassType.None,
        level: 3,
        xp: 900,
      },
    ],
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('parses valid session JSON and rejects malformed or invalid data', () => {
    expect(parseGameSession(JSON.stringify(validSession))).toEqual(validSession);
    expect(() => parseGameSession('{')).toThrow('not valid JSON');
    expect(() => parseGameSession(JSON.stringify({ name: '' }))).toThrow('Invalid session');
  });

  it('persists and clears sessions in localStorage', () => {
    const service = TestBed.inject(GameSessionService);
    service.setSession(validSession);
    expect(service.session()).toEqual(validSession);
    expect(JSON.parse(localStorage.getItem('game_session_data')!)).toEqual(validSession);

    service.clearSession();
    expect(service.session()).toBeNull();
    expect(localStorage.getItem('game_session_data')).toBeNull();
  });

  it('guards routes based on active session state', () => {
    const service = TestBed.inject(GameSessionService);
    const router = TestBed.inject(Router);

    const blockedResult = TestBed.runInInjectionContext(() =>
      sessionGuard({} as never, {} as never),
    );
    expect(blockedResult).toEqual(router.createUrlTree(['/game-session/wrapper']));

    service.setSession(validSession);
    const allowedResult = TestBed.runInInjectionContext(() =>
      sessionGuard({} as never, {} as never),
    );
    expect(allowedResult).toBe(true);
  });
});
