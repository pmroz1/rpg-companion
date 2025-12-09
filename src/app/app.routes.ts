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
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.routes').then((m) => m.MAPS_ROUTES),
  },
];
