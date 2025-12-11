import { Route } from '@angular/router';

export const MAP_EDITOR_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./map-editor').then((m) => m.MapEditor),
  },
];
