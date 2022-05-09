import { ProductStock } from './../../../product/models/product-stock.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/features/product/models/product-models';

import { ShopsModifyComponent } from './shops-modify.component';

describe('ShopsModifyComponent', () => {
  let component: ShopsModifyComponent;
  let fixture: ComponentFixture<ShopsModifyComponent>;
  let newProduct: Product;
  let products: ProductStock[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopsModifyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Unit test Stock functions
  beforeEach(() => {

    newProduct = new Product(
      '4',
      'Doritos',
      'Bolsa de 300g',
      1.3,
      'Doritos picantes bolsa grande',
      'comida',
      '',
      true
    )
    component.products = [
      new ProductStock(new Product(
        '1',
        'Steinburg',
        'Pack de 24 latas',
        2.48,
        'Cerveza lagger de calidad suprema',
        'bebida',
        '',
        true
      ), 5),
      new ProductStock(new Product(
        '2',
        'Casón histórico',
        '1L de vino',
        0.7,
        'Vino tinto para calimocho',
        'bebida',
        '',
        true
      ), 10),
      new ProductStock(new Product(
        '3',
        'Donuts',
        'Pack de 6 unidades',
        4,
        'Donuts original glaseados',
        'comida',
        '',
        true
      ), 2),
      new ProductStock(new Product(
        '4',
        'Doritos',
        'Bolsa de 300g',
        1.3,
        'Doritos picantes bolsa grande',
        'comida',
        '',
        true
      ), 7)
    ];

  });

  it('Increase stock', () => {

    component.increaseStock(6, newProduct);
    let product = !!component?.products ? component.products[3] : null;
    if (!!product){
      expect(product.stock).toBe(13);
      component.increaseStock(10, newProduct);
      expect(product.stock).toBe(23);
    }
  });

  it('Decrease stock', () => {

    component.decreaseStock(6, newProduct);
    let product = !!component?.products ? component.products[3] : null;
    if (!!product){
      expect(product.stock).toBe(1);
      component.decreaseStock(10, newProduct);
      expect(product.stock).toBe(0);
    }
  });


});
