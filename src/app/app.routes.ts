import { Routes } from '@angular/router';

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
