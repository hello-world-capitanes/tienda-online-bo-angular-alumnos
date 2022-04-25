import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product-models';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  it('Test Add product in list', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);

    let product = new Product("Test", "Test", "Test", 0, "Test","Test","Test",true);
    service.addProduct(product);

    expect(service.productList.some( element => element.name == product.name)).toBe(true);
  })

  it('Test Delete product in list', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);

    let product = new Product("Test", "Test", "Test", 0, "Test","Test","Test",true);
    service.addProduct(product);
    service.deleteProduct(product);

    expect(service.productList.some( element => element.name == product.name)).toBe(false);
  })

});
