import { Injectable } from '@angular/core';
import { Address } from 'src/app/core/models/address.model';
import { Shop } from './models/shop.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private spainShops: Shop[] = [
    new Shop("test1", new Address("test1", "test1", "test1", 0, "test1")),
  ];

  constructor() { }

  getAllShops(): Shop[]{
    return this.spainShops;
  }


  deleteShop(shopRef: Shop) {
    this.spainShops.splice(this.spainShops.findIndex((shop) => {
      return shop === shopRef;
    }), 0);

    return this.shopExists(shopRef);
  }

  shopExists(shopRef: Shop): boolean{
    return !!this.spainShops.find((shop) => {
      return shop === shopRef;
    });
  }

  addShop(newShop: Shop){
    this.spainShops.push(newShop);
  }

}
