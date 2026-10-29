import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { GameSessionService } from '@app/core/session/game-session.service';
import { GameSessionWrapper } from './game-session-wrapper';

describe('GameSessionWrapper', () => {
  let fixture: ComponentFixture<GameSessionWrapper>;
  let service: GameSessionService;
  let router: Router;
  const saved = { name: 'Existing campaign', playerCharacters: [] };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [GameSessionWrapper],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(GameSessionWrapper);
    service = TestBed.inject(GameSessionService);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture.detectChanges();
  });

  afterEach(() => vi.restoreAllMocks());

  it('requires a session before continuing', () => {
    fixture.componentInstance.continueGame();
    expect(router.navigate).not.toHaveBeenCalled();

    service.setSession(saved);
    fixture.componentInstance.continueGame();
    expect(router.navigate).toHaveBeenCalledWith(['/game-session/dm-view']);
  });

  it('navigates to new-session on New Session', () => {
    fixture.componentInstance.newGame();
    expect(router.navigate).toHaveBeenCalledWith(['/game-session/new-session']);
  });

  it('loads valid JSON locally and reports errors on invalid JSON', async () => {
    const validInput = {
      files: [{ text: async () => JSON.stringify(saved) }],
      value: 'session.json',
    };
    await fixture.componentInstance.loadGame({ target: validInput } as unknown as Event);
    expect(service.session()).toEqual(saved);
    expect(fixture.componentInstance.error()).toBeNull();
    expect(validInput.value).toBe('');

    const invalidInput = {
      files: [{ text: async () => '{' }],
      value: 'broken.json',
    };
    await fixture.componentInstance.loadGame({ target: invalidInput } as unknown as Event);
    expect(fixture.componentInstance.error()).toContain('not valid JSON');
    expect(service.session()).toEqual(saved);
  });
});
