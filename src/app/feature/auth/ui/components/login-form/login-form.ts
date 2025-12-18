import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDto } from '@app/feature/auth/domain/dtos/login.dto';
import { CustomButton } from '@app/shared/components/custom-button/custom-button';
import { CustomInput } from '@app/shared/components/custom-input/custom-input';

@Component({
  selector: 'cf-login-form',
  imports: [ReactiveFormsModule, CustomInput, CustomButton,],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  loginForm: FormGroup;
  loading = input<boolean>(false);

  output = output<LoginDto>();

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    effect(() => {
      if (this.loading()) {
        this.loginForm.disable();
      } else {
        this.loginForm.enable();
      }
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
      this.output.emit(this.loginForm.value as LoginDto);
  }
}
