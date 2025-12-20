import { inject } from '@angular/core';
import { CanMatchFn, Router, Routes } from '@angular/router';

const hasValidSession = (): boolean => {
    try {
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('user');
        return Boolean(token && token.trim().length > 0 && user);
    } catch {
        return false;
    }
};

const authGuard: CanMatchFn = () => {
    const router = inject(Router);
    return hasValidSession() ? true : router.parseUrl('/login');
};

const loginGuard: CanMatchFn = () => {
    const router = inject(Router);
    return hasValidSession() ? router.parseUrl('/dashboard') : true;
};

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', canMatch: [loginGuard], loadComponent: () => import('@feature/login/pages/auht-page/auht-page').then(m => m.AuhtPage) },
    { path: 'dashboard', canMatch: [authGuard], loadChildren: () => import('./feature/dashboard/dashboard.routes').then(m => m.dashboardRoutes) }
];
