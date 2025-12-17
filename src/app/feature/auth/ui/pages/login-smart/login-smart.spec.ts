import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSmart } from './login-smart';

describe('LoginSmart', () => {
  let component: LoginSmart;
  let fixture: ComponentFixture<LoginSmart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSmart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSmart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
