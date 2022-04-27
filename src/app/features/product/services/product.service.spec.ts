import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product-models';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  it('Test Add product in Product list', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);

    let product = new Product("Test", "Test", "Test", 0, "Test","Test","Test",true);
    service.addProduct(product);

    expect(service.productList.some( element => element.name == product.name)).toBe(true);
  })

  it('Test Delete product in Product list', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);

    let product = new Product("Test", "Test", "Test", 0, "Test","Test","Test",true);
    service.addProduct(product);
    service.deleteProduct(product);

    expect(service.productList.some( element => element.name == product.name)).toBe(false);
  })


  it ('Test find by ID in Product list EXISTING', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);

    let product = new Product("Test", "Test", "Test", 0, "Test","Test","Test",true);
    service.addProduct(product);
    let productFound: Product | undefined = service.findById('Test');
    let result: boolean;

    if (productFound && productFound.id == product.id){
      result = true;
    } else {
      result = false;
    }

    expect(result).toBe(true);
  })


  it ('Test find by ID in Product list NOT EXISTING', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);

    let productFound: Product | undefined = service.findById('Test');
    let result: boolean;

    if (!productFound){
      result = true;
    } else {
      result = false;
    }

    expect(result).toBe(true);
  })

});
