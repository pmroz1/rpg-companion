import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DEFAULT_ABILITIES } from '../components/abilities/models/abilities-info';
import { AvatarState } from '../components/avatar/avatar-state';
import { ClassType, SubclassType } from '@data/enums';
import { CharacterSheetStateService } from './character-sheet.state';

describe('CharacterSheetStateService', () => {
  const legacy = {
    abilities: DEFAULT_ABILITIES,
    appearance: 'An old scar',
    coins: { cp: 2, sp: 3, ep: 0, gp: 50, pp: 0 },
    info: {
      name: 'Aria',
      background: 'Sage',
      race: 'Elf',
      class: ClassType.Wizard,
      subclass: SubclassType.None,
      level: 3,
      xp: 900,
    },
    spellSlots: [{ level: 1, expanded: 1, total: 4 }],
    backstory: { backstoryPersonality: 'Curious', alignment: 'neutral' },
    hitpoints: {
      hitpointsTemp: 0,
      hitpointsCurrent: 12,
      hitpointsMax: 18,
      hitDiceSpent: 1,
      hitDiceMax: 3,
      deathSaveSuccesses: 0,
      deathSaveFailures: 0,
    },
    languages: { knownLanguages: [] },
    proficiencies: { armorTrainingTypes: [], weapons: [], tools: [] },
    spellCasting: {
      spellcastingAbility: '',
      spellcastingModifier: 3,
      spellSaveDC: 13,
      spellAttackBonus: 5,
    },
    spellsCantrips: [],
    notes: 'Keep every field',
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [CharacterSheetStateService] });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('restores legacy character data without avatar using the default silhouette', () => {
    localStorage.setItem('characterSheetState', JSON.stringify(legacy));
    const state = TestBed.inject(CharacterSheetStateService);
    expect(state.character()).toEqual({ ...legacy, avatar: 'images/silhouette.png' });
  });

  it('resets a previous portrait when loading a character without an avatar', () => {
    const state = TestBed.inject(CharacterSheetStateService);
    TestBed.inject(AvatarState).setState('data:image/jpeg;base64,previous');
    state.loadState(JSON.stringify(legacy));
    expect(state.character().avatar).toBe('images/silhouette.png');
  });

  it('preserves an uploaded portrait', () => {
    const data = { ...legacy, avatar: 'data:image/jpeg;base64,portrait' };
    localStorage.setItem('characterSheetState', JSON.stringify(data));
    const state = TestBed.inject(CharacterSheetStateService);
    expect(state.character()).toEqual(data);
  });
});
