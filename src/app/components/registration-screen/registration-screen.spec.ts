import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationScreen } from './registration-screen';

describe('LoginScreen', () => {
  let component: RegistrationScreen;
  let fixture: ComponentFixture<RegistrationScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
