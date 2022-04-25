import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test de la funcion añadir producto', () =>{
    component.productForm.setValue(
      {
        id: '',
        name: 'Sal',
        characteristics: 'Un poco de sal',
        price: 10.00,
        description: 'Un poco de sal',
        categories: 'Lacteos',
      });

      expect(component.newProduct()).toBe(true);
  });

  it('Test de la funcion añadir producto con valores no validos', () =>{
    component.productForm.setValue(
      {
        id: '',
        name: 'Sal',
        characteristics: 'Un poco de sal',
        price: 'aaa',
        description: '',
        categories: 'Lacteos',
      });

      expect(component.newProduct()).toBe(false);
  });
});
