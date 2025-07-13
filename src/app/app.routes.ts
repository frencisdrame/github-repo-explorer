import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home').then(m => m.Home)
    },
    {
        path: 'repos',
        loadComponent: () => import('./features/repos/repos').then(m => m.Repos)
    },
    {
        path: 'commits',
        loadComponent: () => import('./features/commits/commits').then(m => m.Commits)
    },
];
