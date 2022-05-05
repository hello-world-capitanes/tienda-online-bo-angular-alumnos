import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/features/category/models/category.model';
import { Product } from 'src/app/features/product/models/product-models';
import { ProductStock } from 'src/app/features/product/models/product-stock.model';

import { ProductsListShopComponent } from './products-list-shop.component';

describe('ProductsListShopComponent', () => {
  let component: ProductsListShopComponent;
  let fixture: ComponentFixture<ProductsListShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ProductsListShopComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test para aplicar cambios al stock de un producto', () => {
    const result = component.changeStock(
      new ProductStock(
        new Product(
          '1',
          'Steinburg',
          'Pack de 24 latas',
          2.48,
          'Cerveza lagger de calidad suprema',
          [
            new Category('Carne', '3', 'Productos cárnicos', true),
            new Category('Alcohol', '6', 'Pescados', true),
          ],
          'https://a1.soysuper.com/4d20a10aab11ff0e321b129feac2401e.1500.0.0.0.wmark.8d2b900a.jpg',
          true
        ),
        5
      ),
      '12'
    );
    expect(result).toEqual(12);
  });

  it('Test para aplicar cambios al stock de un producto', () => {
    const result = component.changeStock(
      new ProductStock(
        new Product(
          '1',
          'Steinburg',
          'Pack de 24 latas',
          2.48,
          'Cerveza lagger de calidad suprema',
          [
            new Category('Carne', '3', 'Productos cárnicos', true),
            new Category('Alcohol', '6', 'Pescados', true),
          ],
          'https://a1.soysuper.com/4d20a10aab11ff0e321b129feac2401e.1500.0.0.0.wmark.8d2b900a.jpg',
          true
        ),
        11
      ),
      '8'
    );
    expect(result).toEqual(8);
  });
});
