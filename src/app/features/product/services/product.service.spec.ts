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

<<<<<<< HEAD
<<<<<<< HEAD
    let product = new Product("Test", "Test", "Test", 0, "Test", [new Category("Test", "1", "Test", true)],"Test",true);
=======
    let product = new Product("Test", "Test", "Test", 0, "Test",cats,"Test",true);
>>>>>>> develop
    service.addProduct(product);
=======
  afterEach(async(() => {
    service.permantlyDelete(product.id);
  }));
>>>>>>> develop

/*   it('Test Add product in Product list', async () => {

<<<<<<< HEAD
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
=======
    let productFromDatabase = await service.addProduct(product);
    if (!!productFromDatabase) {
      service.getAllProducts().subscribe(products => {
        if (!!products && products.length > 0) {
          const productFounded = products.find(prod => prod?.name === product.name);
          expect(!!productFounded).toBe(true);
          expect(!!productFounded?.active).toBe(true);
          expect(!!productFounded?.id).toBe(true);
        }
      });
>>>>>>> develop
    }

  }) */

/*   it('Test Delete product in Product list', async () => {

    let productFromDatabase = await service.addProduct(product);
    if (!!productFromDatabase) {
      await service.deleteProduct(product);
      service.getAllProducts().subscribe(products => {
        if (!!products && products.length > 0) {
          const productFounded = products.find(prod => prod?.name === product.name);
          expect(!!productFounded).toBe(true);
          expect(!!productFounded?.active).toBe(false);
        }
      });
    }
  }) */



});
