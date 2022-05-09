import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ProductService } from './../product/services/product.service';
import { Shop } from './models/shop.model';
import { SnackBarMessageComponent } from 'src/app/shared/components/snack-bar-message/snack-bar-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIServiceService } from 'src/app/core/services/apiservice.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ShopService extends FirestoreService {
  protected collection: string;
  private readonly SHOP_COLLECTION = 'shops';

  selectedShopSeeProducts!:string;

  constructor(productService: ProductService, firestore: AngularFirestore,
    public snackBar: MatSnackBar) {
    super(firestore);
    this.collection = this.SHOP_COLLECTION;
  }

  getAllShops(): Observable<Shop[]> {
    //return this.getCollection().get().pipe(map(snapshot => snapshot?.docs.map(shop => shop.data() as Shop)));
    return this.getCollection().valueChanges().pipe(map(shops => shops as Shop[]));
  }

  addShop(shop: Shop): Promise<Shop> {
    // Check if shop already exits
    let newShop = {
      id: this.firestore.createId(),
      name: shop.name,
      address: {
        country : shop.address.country,
        province : shop.address.province,
        location : shop.address.location,
        cp : shop.address.cp,
        street : shop.address.street,

      },
      active: shop.active,
      products: shop.products,

    }

    return this.getCollection().doc(newShop.id).set(newShop).then(() => {
      return newShop as Shop;
    });
/*     this.getCollection().add({ name: "aaa"}).then(obj => {
    this.getCollection().doc(obj.id).set({...obj.get(), id: obj.id});
  }) */
  }

  async filterShops(): Promise<Shop[]> {
    const snapshot = await this.getCollection().ref.where("active", "==", true).get();
    return snapshot?.docs.map(doc => {
      const shop = doc?.data() as Shop;
      shop.id = doc.id;
      return shop;
    });
  }

  async getShop(): Promise<Shop> {
    const snapshot = await this.getCollection().ref.where("name", "==", this.selectedShopSeeProducts).get();
    return snapshot?.docs[0].data() as Shop;
  }

  async deleteShop(shop:Shop):Promise<Shop|void>{
    const shop_1 = await this.getCollection().doc(shop.id).update({ 'active': false });
    return shop_1;
  }

  async shopExists(shop: Shop){
    return (await this.getCollection().ref.doc(shop.id).get()).exists;
  }
/*
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
  } */
}
