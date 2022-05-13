import { ProductStock } from './../../../product/models/product-stock.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/features/product/models/product-models';

import { ShopsModifyComponent } from './shops-modify.component';
import { ProductShopFirebase } from 'src/app/features/product/models/product-shop-firebase.model';

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
      [],
      [],
      '',
      true
    )

    component.products = [
      {id:'1', stock: 13} as ProductShopFirebase,
      {id:'2', stock: 1} as ProductShopFirebase,
      {id:'3', stock: 23} as ProductShopFirebase,
      {id:'4', stock: 33} as ProductShopFirebase,
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
