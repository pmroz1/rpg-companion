export const GAME_SESSION_ROUTES = [
  {
    path: '',
    loadComponent: () => import('./game-session').then((m) => m.GameSession),
  },
];
