import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product-models';
import { ProductService } from './product.service';


describe('ProductService', () => {
  let service: ProductService;
  let newProduct: Product | undefined;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        MatSnackBarModule
      ],

    })
      .compileComponents();
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
    newProduct = new Product("TESTING-PRODUCT", "TESTING-PRODUCT", "characteristics",123,"decription",[],"image", true);
  });
  afterEach(async () => {
    if (!!newProduct) {
      await service.permantlyDelete(newProduct.id);
    }
  });

  it('Delete product', async () => {
    if (!!newProduct) {
      newProduct = await service.addProduct(newProduct);
      await service.deleteProduct(newProduct);

      newProduct = await service.getProduct(newProduct.name);
      expect(newProduct.active).toBeFalse();
    }

  });

  it('Add product', async () => {
    if (!!newProduct) {
      newProduct = await service.addProduct(newProduct);

      newProduct = await service.getProduct(newProduct.name);
      expect(newProduct.active).toBeTruthy();
    }

  });

  it('Active product', async () => {
    if (!!newProduct) {
      newProduct = await service.addProduct(newProduct);
      await service.deleteProduct(newProduct);
      await service.activeProduct(newProduct);

      newProduct = await service.getProduct(newProduct.name);
      expect(newProduct.active).toBeTruthy();
    }

  });

  //TODO MIRAR ESTE TEST DE MODIFICAR
  /*it('Modify product', async () => {

    if (!!newProduct) {
      newProduct = await service.addProduct(newProduct);
      newProduct = await service.modifyProduct(newProduct.id,new Product("id","name","characteristics1",1234,"description1",[],"image1",true));


      newProduct = await service.getProduct(newProduct.name);
      expect(newProduct.characteristics).toBe("characteristics1");
      expect(newProduct.price).toBe(1234);
      expect(newProduct.description).toBe("decription1");
      expect(newProduct.image).toBe("image1");



    }

  });*/

});
