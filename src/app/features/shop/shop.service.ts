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
  selectedShopSeeProducts !: string;

  constructor(productService: ProductService, firestore: AngularFirestore) {
    super(firestore);
    this.collection = this.SHOP_COLLECTION;
  }

  getAllShops(): Observable<Shop[]> {
    return this.getCollection().valueChanges().pipe(map(shops => shops as Shop[]));
  }

  getAllShopsActive(): Observable<Shop[]> {
    //return this.getCollection().get().pipe(map(snapshot => snapshot?.docs.map(shop => shop.data() as Shop)));
    return this.getCollection().valueChanges().pipe(map(shops => shops.filter(shop => shop['active'] == true) as Shop[]));
  }

  async addShop(shop: Shop): Promise<Shop | null> {

    if (await this.shopExistsByName(shop)){

      return null

  } else {

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

  }

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

  async deleteShop(shop:Shop):Promise<void | Shop | null>{
    if ((await this.shopExistsById(shop)).valueOf()){
      const shop_1 = await this.getCollection().doc(shop.id).update({ 'active': false });
      return shop_1
    } else {
      return null
    }
  }

  async shopExistsById(shop: Shop): Promise<boolean>{
    return (await this.getCollection().ref.doc(shop.id).get()).exists;
  }


  async shopExistsByName(shop: Shop): Promise<Shop | undefined> {

    const snapshot = await this.getCollection().ref.where("name", "==", shop.name).get();
    return snapshot?.docs && snapshot.docs.length > 0 ? snapshot?.docs[0].data() as Shop : undefined;
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
