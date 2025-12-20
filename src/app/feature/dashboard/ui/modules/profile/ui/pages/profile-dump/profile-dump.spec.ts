import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDump } from './profile-dump';

describe('ProfileDump', () => {
  let component: ProfileDump;
  let fixture: ComponentFixture<ProfileDump>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDump]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDump);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
