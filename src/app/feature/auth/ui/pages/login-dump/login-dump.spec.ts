import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDump } from './login-dump';

describe('LoginDump', () => {
  let component: LoginDump;
  let fixture: ComponentFixture<LoginDump>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDump]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDump);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
