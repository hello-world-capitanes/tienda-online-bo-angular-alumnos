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
    expect(service.deleteShop(new Shop("", new Address("", "", "", 0, "0")))).toBeFalse();
    service.addShop(new Shop("test", new Address("test", "test", "test", 0, "test")));
    service.deleteShop(new Shop("test", new Address("test", "test", "test", 0, "test")))
    expect(service.shopExists(new Shop("test", new Address("test", "test", "test", 0, "test")))).toBeFalse();
  });
});
