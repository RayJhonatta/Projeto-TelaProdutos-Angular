import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsForm } from './add-products-form';

describe('AddProductsForm', () => {
  let component: AddProductsForm;
  let fixture: ComponentFixture<AddProductsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
