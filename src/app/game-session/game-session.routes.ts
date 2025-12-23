import { Route } from '@angular/router';

export const GAME_SESSION_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'wrapper',
    pathMatch: 'full',
  },
  {
    path: 'wrapper',
    loadComponent: () => import('./pages/wrapper/wrapper').then((m) => m.Wrapper),
  },
  {
    path: 'board',
    loadComponent: () => import('./pages/board/board').then((m) => m.Board),
  },
  {
    path: 'dm-tools',
    loadComponent: () => import('./pages/dm-tools/dm-tools').then((m) => m.DmTools),
  },
  {
    path: 'new-session',
    loadComponent: () => import('./pages/new-session/new-session').then((m) => m.NewSession),
  },
];
