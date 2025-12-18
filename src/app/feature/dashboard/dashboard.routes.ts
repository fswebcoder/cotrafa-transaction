import { Routes } from '@angular/router';
import { DashboardLayout } from './ui/layout/dashboard-layout/dashboard-layout';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: 'profile',
        loadComponent: () => import('@feature/dashboard/modules/profile/ui/pages/profile-page/profile-page').then(m => m.ProfilePage)
      },
      {
        path: 'transactions',
        loadComponent: () => import('@feature/dashboard/modules/transactions/ui/pages/transaction-page/transaction-page').then(m => m.TransactionPage)
      },
      // {
      //   path: 'history',
      //   // loadComponent: () => import('./ui/pages/history/history.page').then(m => m.HistoryPage)
      // },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  }
];
