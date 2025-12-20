import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { AuthActions } from '@app/core/state/auth/auth.actions';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, AvatarModule, DrawerModule],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss'
})
export class DashboardLayout {
  private store = inject(Store);

  sidebarVisible = signal(false);
  
  menuItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/dashboard/profile' },
    { label: 'Transacciones', icon: 'pi pi-wallet', route: '/dashboard/transactions' },
    { label: 'Historial', icon: 'pi pi-history', route: '/dashboard/history' }
  ];

  toggleSidebar() {
    this.sidebarVisible.update(v => !v);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
