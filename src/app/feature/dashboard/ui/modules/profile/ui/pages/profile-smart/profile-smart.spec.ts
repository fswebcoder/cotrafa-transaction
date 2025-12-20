import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSmart } from './profile-smart';

describe('ProfileSmart', () => {
  let component: ProfileSmart;
  let fixture: ComponentFixture<ProfileSmart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSmart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSmart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
