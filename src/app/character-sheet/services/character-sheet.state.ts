import { computed, effect, inject, Injectable, untracked } from '@angular/core';
import { AppearanceState } from '../components/appearance/appearance-state';
import { CoinsState } from '../components/coins/coins.state';
import { InfoState } from '../components/info/info.state';
import { SpellSlotsState } from '../components/spell-slots/spell-slots.state';
import { BackstoryState } from '../components/backstory/backstory.state';
import { HitpointsState } from '../components/hitpoints/hitpoints.state';
import { LanguageState } from '../components/languages/languages.state';
import { ProficienciesState } from '../components/proficiencies/proficiencies.state';
import { SpellcastingAbilityState } from '../components/spellcasting-ability/spellcasting-ability.state';
import { NotesState } from '../components/tabs/views/notes/notes.state';
import { SpellsCantripsState } from '../components/tabs/views/spells-cantrips/spell-cantrips.state';
import { CharacterSheetState } from '../models/character-sheet-state.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterSheetStateService {
  private readonly _storageKey = 'characterSheetState';
  private readonly appearance = inject(AppearanceState);
  private readonly coins = inject(CoinsState);
  private readonly info = inject(InfoState);
  private readonly spellSlots = inject(SpellSlotsState);
  private readonly backstory = inject(BackstoryState);
  private readonly hitpoints = inject(HitpointsState);
  private readonly languages = inject(LanguageState);
  private readonly proficiencies = inject(ProficienciesState);
  private readonly spellCasting = inject(SpellcastingAbilityState);
  private readonly spellsCantrips = inject(SpellsCantripsState);
  private readonly notes = inject(NotesState);

  readonly character = computed<CharacterSheetState>(() => ({
    appearance: this.appearance.state(),
    coins: this.coins.state(),
    info: this.info.state(),
    spellSlots: this.spellSlots.state(),
    backstory: this.backstory.state(),
    hitpoints: this.hitpoints.state(),
    languages: this.languages.state(),
    proficiencies: this.proficiencies.state(),
    spellCasting: this.spellCasting.state(),
    spellsCantrips: this.spellsCantrips.state(),
    notes: this.notes.state(),
  }));

  constructor() {
    this.loadState();
    effect((onCleanup) => {
      const state = this.character();
      const timer = setTimeout(() => {
        untracked(() => {
          this.saveState(state);
        });
      }, 200);

      onCleanup(() => {
        clearTimeout(timer);
      });
    });
  }

  saveState(state: CharacterSheetState): void {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(this._storageKey, serializedState);
    } catch (error) {
      console.error('Error saving character sheet state:', error);
    }
  }

  loadState(characterData: string | null = null): void {
    try {
      characterData = characterData ?? localStorage.getItem(this._storageKey);
      if (characterData) {
        const state = JSON.parse(characterData);

        if (this.isValidState(state)) {
          this.appearance.setState(state.appearance);
          this.coins.setState(state.coins);
          this.info.setState(state.info);
          this.spellSlots.setState(state.spellSlots);
          this.backstory.setState(state.backstory);
          this.hitpoints.setState(state.hitpoints);
          this.languages.setState(state.languages);
          this.proficiencies.setState(state.proficiencies);
          this.spellCasting.setState(state.spellCasting);
          this.spellsCantrips.setState(state.spellsCantrips);
          this.notes.setState(state.notes);
        } else {
          console.warn('Invalid character sheet state loaded.');
        }
      }
    } catch (error) {
      console.error('Error loading character sheet state:', error);
    }
  }

  private isValidState(state: unknown): state is CharacterSheetState {
    if (typeof state !== 'object' || state === null) {
      return false;
    }

    const s = state as Record<string, unknown>;

    return (
      typeof s['appearance'] === 'string' &&
      typeof s['coins'] === 'object' &&
      s['coins'] !== null &&
      typeof s['info'] === 'object' &&
      s['info'] !== null &&
      Array.isArray(s['spellSlots']) &&
      typeof s['backstory'] === 'object' &&
      s['backstory'] !== null &&
      typeof s['hitpoints'] === 'object' &&
      s['hitpoints'] !== null &&
      typeof s['languages'] === 'object' &&
      s['languages'] !== null &&
      typeof s['proficiencies'] === 'object' &&
      s['proficiencies'] !== null &&
      typeof s['spellCasting'] === 'object' &&
      s['spellCasting'] !== null &&
      Array.isArray(s['spellsCantrips']) &&
      typeof s['notes'] === 'string'
    );
  }
}
