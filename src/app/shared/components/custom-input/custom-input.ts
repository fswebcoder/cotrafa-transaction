import { FormErrorDirective } from '@shared/directive/form-error.directive';
import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, computed, input, OnInit, OnDestroy, inject, effect } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { InputTransformFn, NgxMaskDirective, OutputTransformFn } from 'ngx-mask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'cf-custom-input',
  standalone: true,
  imports: [
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    PasswordModule,
    FormErrorDirective
  ],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss'
})
export class CustomInput implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  readonly id = `custom-input-${crypto.randomUUID()}`;

  control = new FormControl('');
  onTouchedFn = () => {};
  onChangeFn = (_: any) => {};
  private _isDisabled = false;
  private destroy$ = new Subject<void>();
  private _isWritingValue = false;
  private controlDir = inject(NgControl, { optional: true, self: true });

  constructor() {
    if (this.controlDir != null) {
      this.controlDir.valueAccessor = this;
    }

    effect(() => {
      if (this.disabled()) {
        this.control.disable({ emitEvent: false });
      } else {
        if (!this._isDisabled) {
           this.control.enable({ emitEvent: false });
        }
      }
    });
  }

  icon = input<string>();
  label = input<string>();
  mask = input<string | null>(null);
  suffix = input<string>('');
  prefix = input<string>('');
  allowNegativeNumbers = input<boolean, any>(false, { transform: booleanAttribute });
  thousandSeparator = input<string>('.');
  decimalMarker = input<',' | '.' | ['.', ',']>(',');
  type = input<'text' | 'password' | 'number' | 'email'>('text');
  
  customOutputTransformFn = input<OutputTransformFn>((val: any) => val, { alias: 'outputTransformFn' });
  inputTransformFn = input<InputTransformFn>((val: any) => val);

  errorMessages = input<Record<string, string>>({});
  uppercase = input<boolean>(false);
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  isDisabled = computed(() => this._isDisabled || this.disabled());

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (!this._isWritingValue) {
        this.onChangeFn(value);
      }
    });

    if (this.controlDir && this.controlDir.control) {
      this.controlDir.control.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.control.setErrors(this.controlDir!.control!.errors);
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(obj: any): void {
    if (this.control && !this._isWritingValue) {
      this._isWritingValue = true;
      this.control.setValue(obj, { emitEvent: false });
      this._isWritingValue = false;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }

  validate(_control: FormControl): ValidationErrors | null {
    return this.control.errors;
  }

  onBlur() {
    this.onTouchedFn();
  }

  get hasErrors() {
    const control = this.controlDir?.control || this.control;
    return control.invalid && (control.dirty || control.touched);
  }

  get errorMessage() {
    if (!this.hasErrors) return '';
    const control = this.controlDir?.control || this.control;
    const errors = control.errors;
    if (!errors) return '';
    
    const firstKey = Object.keys(errors)[0];
    const messages = this.errorMessages();
    if (messages && messages[firstKey]) {
      return messages[firstKey];
    }
    
    if (firstKey === 'required') return 'Este campo es requerido';
    if (firstKey === 'email') return 'Correo electrónico inválido';
    if (firstKey === 'minlength') return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    
    return 'Campo inválido';
  }
}
