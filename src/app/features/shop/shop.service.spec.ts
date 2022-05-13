import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Address } from 'src/app/core/models/address.model';
import { environment } from 'src/environments/environment';
import { ProductShopFirebase } from '../product/models/product-shop-firebase.model';
import { Shop } from './models/shop.model';
import { ShopService } from './shop.service';


describe('ShopService', () => {
  let service: ShopService;
  let newShop: Shop | undefined;
  let newShopWithProducts: Shop | undefined;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopService);
    newShop = new Shop('id', 'name', new Address('', '', '', 0, '0'), true, []);
    newShopWithProducts = new Shop(
      'idTest',
      'test',
      new Address('test', 'test', 'test', 0, '1'),
      true,
      [
        {id:'A0SasV3ohcu4kG4vwVxF',stock: 50} as ProductShopFirebase
      ]
    );
  });
  afterEach(async () => {
    if (!!newShop) {
      await service.permantlyDelete(newShop.id);
      newShop = undefined;
    }

    if (!!newShopWithProducts) {
      await service.permantlyDelete(newShopWithProducts.id);
      newShopWithProducts = undefined;
    }
  });

  it('Delete shop', async () => {
    if (!!newShop) {
      newShop = await service.addShop(newShop);
      await service.deleteShop(newShop);

      newShop = await service.getShop(newShop.name);
      expect(newShop.active).toBeFalse();
    }
  });

  it('Add shop', async () => {
    if (!!newShop) {
      newShop = await service.addShop(newShop);

      newShop = await service.getShop(newShop.name);
      expect(newShop.active).toBeTruthy();
    }
  });

  /* it('Increase stock of a product', async () => {
    if (!!newShopWithProducts) {
      newShopWithProducts = await service.addShop(newShopWithProducts);

      newShopWithProducts = await service.getShop(newShopWithProducts.name);

      expect(
        service.modifyStock(
          newShopWithProducts.products[0],
          100,
          newShopWithProducts.id
        )
      ).toBeGreaterThan(50);
    }
  }); */

  /* it('Decrease stock of a product', async () => {
    if (!!newShopWithProducts) {
      newShopWithProducts = await service.addShop(newShopWithProducts);

      newShopWithProducts = await service.getShop(newShopWithProducts.name);

      expect(
        service.modifyStock(
          newShopWithProducts.products[0],
          20,
          newShopWithProducts.id
        )
      ).toBeLessThan(50);
    }
  }); */
});
