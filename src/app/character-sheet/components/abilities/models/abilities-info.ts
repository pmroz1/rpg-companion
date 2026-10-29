import { AbilityType, SkillType } from '@data/enums';

export interface SkillInfo {
  proficient: boolean;
  value: number | null;
}

export interface AbilityData {
  score: number;
  savingThrow: {
    proficient: boolean;
    value: number | null;
  };
  skills: Partial<Record<SkillType, SkillInfo>>;
}

export type AbilitiesInfo = Record<AbilityType, AbilityData>;

const createDefaultAbilityData = (): AbilityData => ({
  score: 10,
  savingThrow: { proficient: false, value: null },
  skills: {},
});

export const DEFAULT_ABILITIES: AbilitiesInfo = {
  [AbilityType.Strength]: createDefaultAbilityData(),
  [AbilityType.Dexterity]: createDefaultAbilityData(),
  [AbilityType.Constitution]: createDefaultAbilityData(),
  [AbilityType.Intelligence]: createDefaultAbilityData(),
  [AbilityType.Wisdom]: createDefaultAbilityData(),
  [AbilityType.Charisma]: createDefaultAbilityData(),
};
