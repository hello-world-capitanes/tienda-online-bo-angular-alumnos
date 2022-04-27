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
    expect(service.deleteShop(new Shop("", "", new Address("", "", "", 0, "0"), true, products))).toBeFalse();
    service.addShop(new Shop("id", "nombre", new Address("test", "test", "test", 0, "test"), true, products));
    service.deleteShop(new Shop("id", "nombre", new Address("test", "test", "test", 0, "test"), true, products));
    expect(service.shopExists).toBeFalse();
  });
});
