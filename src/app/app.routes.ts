import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('@feature/login/pages/auht-page/auht-page').then(m => m.AuhtPage) },
    { path: 'dashboard', loadChildren: () => import('./feature/dashboard/dashboard.routes').then(m => m.dashboardRoutes) }
];
