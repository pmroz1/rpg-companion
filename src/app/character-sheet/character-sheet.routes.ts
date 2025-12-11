import { Route } from '@angular/router';

export const CHARACTER_SHEET_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./character-sheet').then((m) => m.CharacterSheet),
  },
  {
    path: 'fullscreen/:component',
    loadComponent: () => import('./character-sheet').then((m) => m.CharacterSheet),
  },
];
