import { ProductStock } from './../product/models/product-stock.model';
import { async, TestBed } from '@angular/core/testing';
import { Address } from 'src/app/core/models/address.model';
import { Shop } from './models/shop.model';

import { ShopService } from './shop.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

describe('ShopService', () => {
  let service: ShopService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],

    })
    .compileComponents();
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopService);
  });

  it('Delete shop', () => {
    let newShop = new Shop("id", "name", new Address("", "", "", 0, "0"), true, []);
    service.selectedShopSeeProducts = newShop.name
    service.addShop(newShop);
    service.deleteShop(newShop);

    service.getShop().then(shop  => newShop = shop)
    expect(newShop.active).toBeFalse();
  });

  it('Add shop', () => {

    let newShop = new Shop("id", "name", new Address("", "", "", 0, "0"), true, []);
    service.selectedShopSeeProducts = newShop.name
    service.addShop(newShop);

    service.getShop().then(shop  => newShop = shop)
    expect(newShop.active).toBeTruthy();
  })

});
