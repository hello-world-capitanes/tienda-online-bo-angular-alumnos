import { Injectable } from '@angular/core';
import { Address } from './../../core/models/address.model';
import { Product } from './../product/models/product-models';
import { ProductStock } from './../product/models/product-stock.model';
import { Shop } from './models/shop.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private spainShops!: Shop[];
  private _newAddress = new Address("España","Madrid","Alcala", 28890,"Calle Cervantes 10");
  private _productList : Product[];
  private _productStockList : ProductStock[];


  constructor() {
    this._productList = [
      new Product(
        '1',
        'Steinburg',
        'Pack de 24 latas',
        2.48,
        'Cerveza lagger de calidad suprema',
        'bebida',
        '',
        true
      ),
      new Product(
        '2',
        'Casón histórico',
        '1L de vino',
        0.7,
        'Vino tinto para calimocho',
        'bebida',
        '',
        true
      ),
      new Product(
        '3',
        'Donuts',
        'Pack de 6 unidades',
        4,
        'Donuts original glaseados',
        'comida',
        '',
        true
      ),
      new Product(
        '4',
        'Doritos',
        'Bolsa de 300g',
        1.3,
        'Doritos picantes bolsa grande',
        'comida',
        '',
        true
      ),
    ];
    this._productStockList = [
      new ProductStock(this._productList[0],5),
      new ProductStock(this._productList[1],14),
      new ProductStock(this._productList[2],2),
      new ProductStock(this._productList[3],7),
    ];
    this.spainShops = [
      new Shop("1234","Mercadona",this._newAddress,true,this._productStockList),
      new Shop("4561","Lidl",this._newAddress,true,this._productStockList),
      new Shop("7895","Mediamarkt",this._newAddress,true,this._productStockList),
    ]
   }

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

  getShop(id:string){
    return this.spainShops.find(shop => {
      shop.id === id;
      return shop;
    })
  }

}
