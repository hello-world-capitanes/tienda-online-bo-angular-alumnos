import { ProductService } from './../product/services/product.service';
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
  private _newAddress = new Address(
    'España',
    'Madrid',
    'Alcala',
    28890,
    'Calle Cervantes 10'
  );
  private _productList: Product[];
  private _productStockList: ProductStock[];
  private _selectedShopSeeProducts!: string;



  constructor(private productService:ProductService) {
    this._productList=productService.getAllProducts();

    this._productStockList = [
      new ProductStock(this._productList[0], 5),
      new ProductStock(this._productList[1], 14),
      new ProductStock(this._productList[2], 2),
      new ProductStock(this._productList[3], 7),
    ];

    this.spainShops = [
      new Shop(
        '1234',
        'Mercadona',
        this._newAddress,
        true,
        this._productStockList
      ),
      new Shop('4561', 'Lidl', this._newAddress, true, this._productStockList),
      new Shop(
        '7895',
        'Mediamarkt',
        this._newAddress,
        true,
        this._productStockList
      ),
    ];
  }

  getAllShops(): Shop[] {
    return this.spainShops;
  }

  deleteShop(shopRef: Shop) {
    let index = this.spainShops.findIndex((shop) => {
      return shop.id === shopRef.id;
    });
    this.spainShops.splice(index, 1);

    return !this.shopExists(shopRef);
  }

  shopExists(shopRef: Shop): boolean {
    return !!this.spainShops.find((shop) => {
      return shop === shopRef;
    });
  }

  addShop(newShop: Shop) {
    this.spainShops.push(newShop);
  }

  getShop(id: string) {
    return this.spainShops.find((shop) => {
      shop.id === id;
      return shop;
    });
  }

  addProduct(product: ProductStock) {
    this._productStockList.push(product);
  }

  increaseStockProduct(product: ProductStock) {
    this._productStockList.find((productFind) => {
      if (productFind.product.id === product.product.id) {
        productFind.stock = product.stock;
      }
    });
  }

  decreaseStockProduct(product: ProductStock) {
    this._productStockList.find((productFind) => {
      if (productFind.product.id === product.product.id) {
        productFind.stock = product.stock;
      }
    });
  }
  getProductsStock() {
    return this._productStockList;
  }

  public get selectedShopSeeProducts(): string {
    return this._selectedShopSeeProducts;
  }
  public set selectedShopSeeProducts(value: string) {
    this._selectedShopSeeProducts = value;
  }
}
