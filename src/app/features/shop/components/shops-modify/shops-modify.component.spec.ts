import { ProductStock } from './../../../product/models/product-stock.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/features/product/models/product-models';

import { ShopsModifyComponent } from './shops-modify.component';
import { Category } from 'src/app/features/category/models/category.model';

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
      [new Category("Comida", "1", "Comida", true)],
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
        [new Category("Bebida", "1", "Bebida", true)],
        '',
        true
      ), 5),
      new ProductStock(new Product(
        '2',
        'Casón histórico',
        '1L de vino',
        0.7,
        'Vino tinto para calimocho',
        [new Category("Bebida", "1", "Bebida", true)],
        '',
        true
      ), 10),
      new ProductStock(new Product(
        '3',
        'Donuts',
        'Pack de 6 unidades',
        4,
        'Donuts original glaseados',
        [new Category("Comida", "1", "Comida", true)],
        '',
        true
      ), 2),
      new ProductStock(new Product(
        '4',
        'Doritos',
        'Bolsa de 300g',
        1.3,
        'Doritos picantes bolsa grande',
        [new Category("Comida", "1", "Comida", true)],
        '',
        true
      ), 7)
    ];

  });
});
