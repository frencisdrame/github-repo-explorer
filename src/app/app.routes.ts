import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'repos',
        loadComponent: () => import('./features/repos/repos'),
    },
    {
        path: '',
        redirectTo: 'repos',
        pathMatch: 'full'
    }
];
