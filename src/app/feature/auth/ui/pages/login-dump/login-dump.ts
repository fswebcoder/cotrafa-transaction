import { Component, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { LoginForm } from '../../components/login-form/login-form';
import { LoginDto } from '@app/feature/auth/domain/dtos/login.dto';

@Component({
  selector: 'cf-login-dump',
  imports: [CardModule, LoginForm],
  templateUrl: './login-dump.html',
  styleUrl: './login-dump.scss',
})
export class LoginDump {
  loading = input<boolean>(false);
  output = output<LoginDto>();

  onLogin(loginDto: LoginDto) {
    this.output.emit(loginDto);
  }
}
