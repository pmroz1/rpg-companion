import { CoinsInfo } from '../components/coins/models/coins-info';
import { CharacterInfo } from '../components/info/model/character-info';
import { SpellSlotInfo } from '../components/spell-slots/model/spell-slot-info';
import { BackstoryInfo } from '../components/backstory/models/backstory-info';
import { HitpointsInfo } from '../components/hitpoints/model/hitpoints-info';
import { LanguagesInfo } from '../components/languages/models/languages-info';
import { ProficienciesInfo } from '../components/proficiencies/model/proficiencies-info';
import { SpellcastingStats } from '../components/spellcasting-ability/model/spellcasting';
import { SpellCantrip } from '@data/models';
import { AbilitiesInfo } from '../components/abilities/models/abilities-info';

export interface CharacterSheetState {
  abilities: AbilitiesInfo;
  appearance: string;
  coins: CoinsInfo;
  info: CharacterInfo;
  spellSlots: SpellSlotInfo[];
  backstory: BackstoryInfo;
  hitpoints: HitpointsInfo;
  languages: LanguagesInfo;
  proficiencies: ProficienciesInfo;
  spellCasting: SpellcastingStats;
  spellsCantrips: SpellCantrip[];
  notes: string;
}
