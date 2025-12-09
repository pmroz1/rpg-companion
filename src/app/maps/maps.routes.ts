import { Route } from '@angular/router';

export const MAPS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./maps').then((m) => m.Maps),
  },
];
