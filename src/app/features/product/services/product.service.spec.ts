import { TestBed } from '@angular/core/testing';
import { Category } from '../../category/models/category.model';
import { Product } from '../models/product-models';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  it('Test Add product in Product list', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
    const cat = new Category('name', 'id', 'desc', true);
    const cat2 = new Category('name2', 'i2', 'desc2', true);
    const cats = [cat, cat2]

<<<<<<< HEAD
    let product = new Product("Test", "Test", "Test", 0, "Test", [new Category("Test", "1", "Test", true)],"Test",true);
=======
    let product = new Product("Test", "Test", "Test", 0, "Test",cats,"Test",true);
>>>>>>> develop
    service.addProduct(product);

    expect(service.productList.some( element => element.name == product.name)).toBe(true);
  })

  it('Test Delete product in Product list', () => {
    const cat = new Category('name', 'id', 'desc', true);
    const cat2 = new Category('name2', 'i2', 'desc2', true);
    const cats = [cat, cat2]
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);

<<<<<<< HEAD
    let product = new Product("Test", "Test", "Test", 0, "Test",[new Category("Test", "1", "Test", true)],"Test",true);
=======
    let product = new Product("Test", "Test", "Test", 0, "Test",cats,"Test",true);
>>>>>>> develop
    service.addProduct(product);
    service.deleteProduct(product);

    expect(service.productList.some( element => element.name == product.name)).toBe(false);
  })


  it ('Test find by ID in Product list EXISTING', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
    const cat = new Category('name', 'id', 'desc', true);
    const cat2 = new Category('name2', 'i2', 'desc2', true);
    const cats = [cat, cat2]

<<<<<<< HEAD
    let product = new Product("Test", "Test", "Test", 0, "Test",[new Category("Test", "1", "Test", true)],"Test",true);
=======
    let product = new Product("Test", "Test", "Test", 0, "Test",cats,"Test",true);
>>>>>>> develop
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
