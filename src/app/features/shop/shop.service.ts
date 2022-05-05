import { ProductService } from './../product/services/product.service';
import { Injectable } from '@angular/core';
import { Address } from './../../core/models/address.model';
import { Product } from './../product/models/product-models';
import { ProductStock } from './../product/models/product-stock.model';
import { Shop } from './models/shop.model';
import { APIServiceService } from 'src/app/core/services/apiservice.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ShopService extends APIServiceService{

  protected collection!: string;
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



  constructor(private  firestoreInit: AngularFirestore,
    private productService: ProductService) {

    super(firestoreInit);

    this._productList =  this.productService.getAllProducts();

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

    this.firestoreInit.collection('shops').doc('A0SasV3ohcu4kG4vwVxF').update({'active': false});

    return !this.shopExists(shopRef);
  }

  async shopExists(shopRef: Shop): Promise<boolean>{

    return (await this.firestoreInit.collection('shops').ref.doc('A0SasV3DNSDAHohcu4kG4vwVxF').get()).exists;
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
