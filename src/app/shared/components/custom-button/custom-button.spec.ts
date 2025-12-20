import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { CustomButton } from './custom-button';

describe('CustomButton', () => {
  let component: CustomButton;
  let fixture: ComponentFixture<CustomButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería tener el variant por defecto primary', () => {
    expect(component.variant()).toBe('primary');
  });
});
