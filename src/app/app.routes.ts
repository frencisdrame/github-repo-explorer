import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'repos',
        loadComponent: () => import('./features/repos/repos').then(m => m.Repos)
    },
    {
        path: 'commits',
        loadComponent: () => import('./features/commits/commits').then(m => m.Commits)
    },
    {
        path: '',
        redirectTo: 'repos',
        pathMatch: 'full'
    }
];
