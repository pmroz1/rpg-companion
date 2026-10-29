import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'character-sheet',
    loadChildren: () =>
      import('./character-sheet/character-sheet.routes').then((m) => m.CHARACTER_SHEET_ROUTES),
  },
  {
    path: 'game-session',
    loadChildren: () =>
      import('./game-session/game-session.routes').then((m) => m.GAME_SESSION_ROUTES),
  },
  {
    path: 'map-editor',
    loadChildren: () => import('./map-editor/map-editor.routes').then((m) => m.MAP_EDITOR_ROUTES),
  },
];
