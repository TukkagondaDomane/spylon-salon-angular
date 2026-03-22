import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'services',
        loadComponent: () => import('./features/services/services').then((m) => m.Services),
      },
      {
        path: 'auth',
        loadComponent: () => import('./features/auth/auth').then((m) => m.Auth),
      },
    ],
  },
];
