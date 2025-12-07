import { DndSubclass } from '../models';
import { ClassType, SubclassType } from '../enums';

export const DND_SUBCLASSES: readonly DndSubclass[] = [
  // Barbarian
  { id: SubclassType.Berserker, name: 'Path of the Berserker', parentClass: ClassType.Barbarian },
  { id: SubclassType.WildHeart, name: 'Path of the Wild Heart', parentClass: ClassType.Barbarian },
  { id: SubclassType.WorldTree, name: 'Path of the World Tree', parentClass: ClassType.Barbarian },
  { id: SubclassType.Zealot, name: 'Path of the Zealot', parentClass: ClassType.Barbarian },
  // Bard
  { id: SubclassType.Dance, name: 'College of Dance', parentClass: ClassType.Bard },
  { id: SubclassType.Glamour, name: 'College of Glamour', parentClass: ClassType.Bard },
  { id: SubclassType.Lore, name: 'College of Lore', parentClass: ClassType.Bard },
  { id: SubclassType.Valor, name: 'College of Valor', parentClass: ClassType.Bard },
  // Cleric
  { id: SubclassType.LifeDomain, name: 'Life Domain', parentClass: ClassType.Cleric },
  { id: SubclassType.LightDomain, name: 'Light Domain', parentClass: ClassType.Cleric },
  { id: SubclassType.TrickeryDomain, name: 'Trickery Domain', parentClass: ClassType.Cleric },
  { id: SubclassType.WarDomain, name: 'War Domain', parentClass: ClassType.Cleric },
  // Druid
  { id: SubclassType.Land, name: 'Circle of the Land', parentClass: ClassType.Druid },
  { id: SubclassType.Moon, name: 'Circle of the Moon', parentClass: ClassType.Druid },
  { id: SubclassType.Sea, name: 'Circle of the Sea', parentClass: ClassType.Druid },
  { id: SubclassType.Stars, name: 'Circle of the Stars', parentClass: ClassType.Druid },
  // Fighter
  { id: SubclassType.BattleMaster, name: 'Battle Master', parentClass: ClassType.Fighter },
  { id: SubclassType.Champion, name: 'Champion', parentClass: ClassType.Fighter },
  { id: SubclassType.EldritchKnight, name: 'Eldritch Knight', parentClass: ClassType.Fighter },
  { id: SubclassType.PsiWarrior, name: 'Psi Warrior', parentClass: ClassType.Fighter },
  // Monk
  { id: SubclassType.Mercy, name: 'Way of Mercy', parentClass: ClassType.Monk },
  { id: SubclassType.Shadow, name: 'Way of Shadow', parentClass: ClassType.Monk },
  { id: SubclassType.Elements, name: 'Way of the Four Elements', parentClass: ClassType.Monk },
  { id: SubclassType.OpenHand, name: 'Way of the Open Hand', parentClass: ClassType.Monk },
  // Paladin
  { id: SubclassType.Devotion, name: 'Oath of Devotion', parentClass: ClassType.Paladin },
  { id: SubclassType.Glory, name: 'Oath of Glory', parentClass: ClassType.Paladin },
  { id: SubclassType.Ancients, name: 'Oath of the Ancients', parentClass: ClassType.Paladin },
  { id: SubclassType.Vengeance, name: 'Oath of Vengeance', parentClass: ClassType.Paladin },
  // Ranger
  { id: SubclassType.BeastMaster, name: 'Beast Master', parentClass: ClassType.Ranger },
  { id: SubclassType.FeyWanderer, name: 'Fey Wanderer', parentClass: ClassType.Ranger },
  { id: SubclassType.GloomStalker, name: 'Gloom Stalker', parentClass: ClassType.Ranger },
  { id: SubclassType.Hunter, name: 'Hunter', parentClass: ClassType.Ranger },
  // Rogue
  { id: SubclassType.ArcaneTrickster, name: 'Arcane Trickster', parentClass: ClassType.Rogue },
  { id: SubclassType.Assassin, name: 'Assassin', parentClass: ClassType.Rogue },
  { id: SubclassType.Soulknife, name: 'Soulknife', parentClass: ClassType.Rogue },
  { id: SubclassType.Thief, name: 'Thief', parentClass: ClassType.Rogue },
  // Sorcerer
  { id: SubclassType.AberrantSorcery, name: 'Aberrant Sorcery', parentClass: ClassType.Sorcerer },
  { id: SubclassType.ClockworkSorcery, name: 'Clockwork Sorcery', parentClass: ClassType.Sorcerer },
  { id: SubclassType.DraconicSorcery, name: 'Draconic Sorcery', parentClass: ClassType.Sorcerer },
  { id: SubclassType.WildMagic, name: 'Wild Magic', parentClass: ClassType.Sorcerer },
  // Warlock
  { id: SubclassType.Archfey, name: 'Archfey Patron', parentClass: ClassType.Warlock },
  { id: SubclassType.Celestial, name: 'Celestial Patron', parentClass: ClassType.Warlock },
  { id: SubclassType.Fiend, name: 'Fiend Patron', parentClass: ClassType.Warlock },
  { id: SubclassType.GreatOldOne, name: 'Great Old One Patron', parentClass: ClassType.Warlock },
  // Wizard
  { id: SubclassType.Abjurer, name: 'School of Abjuration', parentClass: ClassType.Wizard },
  { id: SubclassType.Diviner, name: 'School of Divination', parentClass: ClassType.Wizard },
  { id: SubclassType.Evoker, name: 'School of Evocation', parentClass: ClassType.Wizard },
  { id: SubclassType.Illusionist, name: 'School of Illusion', parentClass: ClassType.Wizard },
] as const;
