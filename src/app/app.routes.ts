import { Routes } from '@angular/router';
import { CHARACTER_SHEET_ROUTES } from './character-sheet/character-sheet.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'character-sheet',
    pathMatch: 'full',
  },
  {
    path: 'character-sheet',
    loadChildren: () =>
      import('./character-sheet/character-sheet.routes').then((m) => m.CHARACTER_SHEET_ROUTES),
  },
];
