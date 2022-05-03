import { ProductStock } from './../product/models/product-stock.model';
import { TestBed } from '@angular/core/testing';
import { Address } from 'src/app/core/models/address.model';
import { Shop } from './models/shop.model';

import { ShopService } from './shop.service';

describe('ShopService', () => {
  let service: ShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopService);
  });

  it('Delete shop', () => {
    const products = service.getProductsStock();
    const newShop = new Shop("id", "name", new Address("", "", "", 0, "0"), true, products);
    service.addShop(newShop);
    service.deleteShop(newShop);
    expect(service.shopExists(newShop)).toBeFalse();
  });

  it('Add shop', () => {
    const products = service.getProductsStock();
    const newShop = new Shop("id", "name", new Address("", "", "", 0, "0"), true, products);
    service.addShop(newShop);
    expect(service.shopExists(newShop)).toBeTruthy();
  })

});
