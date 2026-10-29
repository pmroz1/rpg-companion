export const DASHBOARD_ROUTES = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then((m) => m.Dashboard),
  },
];
