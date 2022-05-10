import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { Category } from '../../category/models/category.model';
import { Product } from '../models/product-models';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let cat: Category;
  let cat2: Category;
  let cats: Category[];
  let product: Product;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],

    })
      .compileComponents();
    service = TestBed.inject(ProductService);
    cat = new Category('name', 'id', 'desc', true);
    cat2 = new Category('name2', 'i2', 'desc2', true);
    cats = [cat, cat2]
    product = new Product("Test", "Test", "Test", 0, "Test", cats, "Test", true);
  }));

  afterEach(async(() => {
    service.permantlyDelete(product.id);
  }));

  it('Test Add product in Product list', () => {

    service.addProduct(product);

    expect(service.productList.some(element => element.name == product.name)).toBe(true);
  })

  it('Test Delete product in Product list', async () => {

    await service.addProduct(product);
    await service.deleteProduct(product);

    expect(service.productList.some(element => element.name == product.name)).toBe(false);
  })


  it('Test find by ID in Product list EXISTING', () => {

    service.addProduct(product);
    let productFound: Product | undefined = service.findById('Test');
    let result: boolean;

    if (productFound && productFound.id == product.id) {
      result = true;
    } else {
      result = false;
    }

    expect(result).toBe(true);
  })


  it('Test find by ID in Product list NOT EXISTING', () => {


    let productFound: Product | undefined = service.findById('Test');
    let result: boolean;

    if (!productFound) {
      result = true;
    } else {
      result = false;
    }

    expect(result).toBe(true);
  })

});
