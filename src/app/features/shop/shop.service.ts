import { Injectable } from '@angular/core';
import { Shop } from './models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private spainShops!: Shop[];

  constructor() { }

  getAllShops(): Shop[]{
    return this.spainShops;
  }

  deleteShop(shopRef: Shop){
    return !!this.spainShops.find((shop) =>{
      return shop == shopRef;
    });
  }

  addShop(newShop: Shop){
    this.spainShops.push(newShop);
  }

  getProducts(){

  }

}
