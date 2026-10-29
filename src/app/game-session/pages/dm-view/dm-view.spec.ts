import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { GameSessionService } from '@app/core/session/game-session.service';
import { DmView } from './dm-view';

describe('DmView', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders party members and disables unimplemented board controls', () => {
    TestBed.inject(GameSessionService).setSession({
      name: 'Party',
      playerCharacters: [
        {
          name: 'Aria',
          race: 'Elf',
          background: 'Sage',
          class: null,
          subclass: null,
          level: 3,
          xp: 900,
        },
      ],
    });
    const fixture = TestBed.createComponent(DmView);
    fixture.detectChanges();

    const root: HTMLElement = fixture.nativeElement;
    const boardButtons = Array.from(
      root.querySelectorAll<HTMLButtonElement>('app-dm-game-board button'),
    );
    expect(boardButtons.every((button) => button.disabled)).toBe(true);

    const playersTab = root.querySelector('p-tab[value="players"]') as HTMLElement;
    playersTab.click();
    fixture.detectChanges();
    expect(root.querySelector('app-dm-players-tab')?.textContent).toContain('Aria');
  });
});
