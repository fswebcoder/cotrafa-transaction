import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginDump } from '../login-dump/login-dump';
import { LoginDto } from '@app/feature/auth/domain/dtos/login.dto';
import { AuthActions } from '@app/core/state/auth/auth.actions';
import { selectIsLoading } from '@app/core/state/auth/auth.selectors';

@Component({
  selector: 'cf-login-smart',
  imports: [LoginDump],
  templateUrl: './login-smart.html',
  styleUrl: './login-smart.scss',
})
export class LoginSmart {
  private store = inject(Store);
  loading = this.store.selectSignal(selectIsLoading);

  onLogin(loginDto: LoginDto) {
    this.store.dispatch(AuthActions.login({ loginDto }));
  }
}
