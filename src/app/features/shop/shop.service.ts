import { ProductService } from './../product/services/product.service';
import { Injectable } from '@angular/core';
import { Address } from './../../core/models/address.model';
import { Product } from './../product/models/product-models';
import { ProductStock } from './../product/models/product-stock.model';
import { Shop } from './models/shop.model';
import { SnackBarMessageComponent } from 'src/app/shared/components/snack-bar-message/snack-bar-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private spainShops: Shop[];
  private _newAddress = new Address(
    'España',
    'Madrid',
    'Alcala',
    28890,
    'Calle Cervantes 10'
  );
  private _productList: Product[];
  private _productStockList: ProductStock[];
  private _selectedShopSeeProducts!: Shop;

  constructor(
    private productService: ProductService,
    public snackBar: MatSnackBar
  ) {
    this._productList = productService.getAllProducts();

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

  getProductsStock() {
    return this._productStockList;
  }

  public get selectedShopSeeProducts(): Shop {
    return this._selectedShopSeeProducts;
  }
  setSelectedShopSeeProducts(value: Shop) {
    this._selectedShopSeeProducts = value;
  }

  modifyStock(prod: ProductStock, units: number) {
    prod.stock = units;
    this.snackBar.openFromComponent(SnackBarMessageComponent, {
      data: 'Stock del producto ' + prod.product.name + ' modificado',
      duration: 1500,
    });
    return prod.stock;
  }
}
