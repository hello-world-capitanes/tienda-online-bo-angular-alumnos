import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ProductService } from './../product/services/product.service';
import { Shop } from './models/shop.model';
import { APIServiceService } from 'src/app/core/services/apiservice.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ShopService extends FirestoreService {
  protected collection: string;
  private readonly SHOP_COLLECTION = 'shops';

  constructor(productService: ProductService, firestore: AngularFirestore) {
    super(firestore);
    this.collection = this.SHOP_COLLECTION;
  }

  getAllShops(): Observable<Shop[]> {
    //return this.getCollection().get().pipe(map(snapshot => snapshot?.docs.map(shop => shop.data() as Shop)));
    return this.getCollection().valueChanges().pipe(map(shops => shops as Shop[]));
  }

  async shopExists(shopRef: Shop): Promise<boolean>{

    return (await this.firestore.collection('shops').ref.doc('A0SasV3DNSDAHohcu4kG4vwVxF').get()).exists;

  }

  async addShop(shop: Shop): Promise<Shop> {
  // Check if shop already exits

  shop.id = this.getFirestore().createId();
  await this.getCollection().doc(shop.id).set(shop);
    return shop;
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

  async getShop(id: string): Promise<Shop> {
    const snapshot = await this.getCollection().ref.where("id", "==", id).get();
    return snapshot?.docs[0].data() as Shop;
  }

  async deleteShop(shop:Shop):Promise<Shop|void>{
    const shop_1 = await this.getCollection().doc(shop.id).update({ 'active': false });
    return shop_1;
  }

/*
  addProduct(product: ProductStock) {
    this._productStockList.push(product);
  }

  getProductsStock() {
    return this._productStockList;
  }

  public get selectedShopSeeProducts(): string {
    return this._selectedShopSeeProducts;
  }
  public set selectedShopSeeProducts(value: string) {
    this._selectedShopSeeProducts = value;
  } */
}
