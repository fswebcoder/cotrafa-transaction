import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNgxMask } from 'ngx-mask';

import { CustomInput } from './custom-input';

describe('CustomInput', () => {
  let component: CustomInput;
  let fixture: ComponentFixture<CustomInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInput],
      providers: [...provideNgxMask()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
