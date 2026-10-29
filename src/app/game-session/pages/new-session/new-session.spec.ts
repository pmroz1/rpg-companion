import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { GameSessionService } from '@app/core/session/game-session.service';
import { NewSession } from './new-session';

describe('NewSession', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [NewSession], providers: [provideRouter([])] });
  });

  afterEach(() => vi.restoreAllMocks());

  it('creates a named session and navigates to DM View', () => {
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(NewSession);
    fixture.componentInstance.name.set('  Campaign  ');
    fixture.componentInstance.createSession();

    expect(TestBed.inject(GameSessionService).session()).toEqual({
      name: 'Campaign',
      playerCharacters: [],
    });
    expect(router.navigate).toHaveBeenCalledWith(['/game-session/dm-view']);
  });
});
