import { Alignment } from '@data/enums/alignment';
import { DndAlignment } from '@data/models';

export const DND_ALIGNMENTS: DndAlignment[] = [
  {
    id: Alignment.LawfulGood,
    name: 'Lawful Good',
  },
  {
    id: Alignment.NeutralGood,
    name: 'Neutral Good',
  },
  {
    id: Alignment.ChaoticGood,
    name: 'Chaotic Good',
  },
  {
    id: Alignment.LawfulNeutral,
    name: 'Lawful Neutral',
  },
  {
    id: Alignment.TrueNeutral,
    name: 'True Neutral',
  },
  {
    id: Alignment.ChaoticNeutral,
    name: 'Chaotic Neutral',
  },
  {
    id: Alignment.LawfulEvil,
    name: 'Lawful Evil',
  },
  {
    id: Alignment.NeutralEvil,
    name: 'Neutral Evil',
  },
  {
    id: Alignment.ChaoticEvil,
    name: 'Chaotic Evil',
  },
];
