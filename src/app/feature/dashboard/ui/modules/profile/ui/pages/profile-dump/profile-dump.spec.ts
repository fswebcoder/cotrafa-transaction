import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';

import { ProfileDump } from './profile-dump';

describe('ProfileDump', () => {
  let component: ProfileDump;
  let fixture: ComponentFixture<ProfileDump>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDump],
      providers: [provideRouter([]), ...provideNgxMask()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDump);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
