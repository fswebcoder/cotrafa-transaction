import { FormErrorDirective } from '@shared/directive/form-error.directive';
import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, computed, effect, inject, input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'cf-custom-select',
  standalone: true,
  imports: [
    CommonModule,
    FloatLabelModule,
    SelectModule,
    ReactiveFormsModule,
    FormErrorDirective
  ],
  templateUrl: './custom-select.html',
  styleUrl: './custom-select.scss'
})
export class CustomSelect implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  readonly id = `custom-select-${crypto.randomUUID()}`;

  control = new FormControl<any>(null);
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

  label = input<string>();
  options = input<any[]>([]);
  optionLabel = input<string>();
  optionValue = input<string>();
  placeholder = input<string>('');
  loading = input<boolean>(false);
  filter = input<boolean>(false);
  showClear = input<boolean>(false);
  
  errorMessages = input<Record<string, string>>({});
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
    
    return 'Campo inválido';
  }
}
