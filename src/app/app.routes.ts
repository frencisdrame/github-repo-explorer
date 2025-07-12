import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'repos',
        loadComponent: () => import('./features/repos/repos').then(m => m.Repos),
    },
    {
        path: '',
        redirectTo: 'repos',
        pathMatch: 'full'
    }
];
