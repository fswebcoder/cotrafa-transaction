import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastModule } from 'primeng/toast';
import { AuthActions } from './core/state/auth/auth.actions';
import { LoadingOverlay } from './shared/components/loading-overlay/loading-overlay';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, LoadingOverlay],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('cotrafa-transaccional');
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkAuth());
  }
}
