import { Route } from '@angular/router';
import { sessionGuard } from '@app/core/session/session.guard';

export const GAME_SESSION_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'wrapper',
    pathMatch: 'full',
  },
  {
    path: 'wrapper',
    loadComponent: () =>
      import('./pages/game-session-wrapper/game-session-wrapper').then((m) => m.GameSessionWrapper),
  },
  {
    path: 'board',
    canActivate: [sessionGuard],
    loadComponent: () => import('./pages/board/board').then((m) => m.Board),
  },
  {
    path: 'dm-view',
    canActivate: [sessionGuard],
    loadComponent: () => import('./pages/dm-view/dm-view').then((m) => m.DmView),
  },
  {
    path: 'new-session',
    loadComponent: () => import('./pages/new-session/new-session').then((m) => m.NewSession),
  },
];
