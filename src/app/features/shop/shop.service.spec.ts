import { async, TestBed } from '@angular/core/testing';
import { Address } from 'src/app/core/models/address.model';
import { Shop } from './models/shop.model';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { ShopService } from './shop.service';
import { ProductStock } from '../product/models/product-stock.model';
import { Product } from '../product/models/product-models';
import { Category } from '../category/models/category.model';

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
  });
  afterEach(async () => {
    if (!!newShop) {
      await service.permantlyDelete(newShop.id);
      newShop = undefined;
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
    expect(
      service.modifyStock(
        new ProductStock(
          new Product(
            '10H5bKRT2wQvtAVppfov',
            'Perdemos controles',
            'Pack de 6 unidades',
            4,
            'Donuts original glaseados',
            [new Category('test', '1', 'testing', true)],
            'https://m.media-amazon.com/images/I/910x9xh3rcL._AC_SL1500_.jpg',
            true
          ),
          50
        ),
        100,
        'A0SasV3ohcu4kG4vwVxF'
      )
    ).toBeGreaterThan(50);
  });

  it('Decrease stock of a product', async () => {
    expect(
      service.modifyStock(
        new ProductStock(
          new Product(
            '10H5bKRT2wQvtAVppfov',
            'Perdemos controles',
            'Pack de 6 unidades',
            4,
            'Donuts original glaseados',
            [new Category('test', '1', 'testing', true)],
            'https://m.media-amazon.com/images/I/910x9xh3rcL._AC_SL1500_.jpg',
            true
          ),
          50
        ),
        20,
        'A0SasV3ohcu4kG4vwVxF'
      )
    ).toBeLessThan(50);
  }); */
});
