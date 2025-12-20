import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNgxMask } from 'ngx-mask';

import { LoginDump } from './login-dump';

describe('LoginDump', () => {
  let component: LoginDump;
  let fixture: ComponentFixture<LoginDump>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDump],
      providers: [...provideNgxMask()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDump);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
