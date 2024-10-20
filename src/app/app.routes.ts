import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/components/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/components/favorites.component').then((m) => m.FavoritesComponent),
  },
];
