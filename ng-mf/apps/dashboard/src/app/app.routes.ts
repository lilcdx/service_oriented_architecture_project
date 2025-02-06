import { AppComponent } from './app.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'bingo',
    loadChildren: () => import('bingo/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('login/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: AppComponent,
  },
];
