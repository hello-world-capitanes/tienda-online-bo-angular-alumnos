import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ProductService } from './../product/services/product.service';
import { Shop } from './models/shop.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService extends FirestoreService {
  protected collection: string;
  private readonly SHOP_COLLECTION = 'shops';

  constructor(productService: ProductService, firestore: AngularFirestore) {
    super(firestore);
    this.collection = this.SHOP_COLLECTION;
    //this._productList$= productService.getAllProducts();

  }

  getAllShops(): Observable<Shop[]> {
    //return this.getCollection().get().pipe(map(snapshot => snapshot?.docs.map(shop => shop.data() as Shop)));
    return this.getCollection().valueChanges().pipe(map(shops => shops as Shop[]));
  }

  addShop(shop: Shop): Promise<Shop> {
    // Check if shop already exits

    shop.id = this.getFirestore().createId();
    return this.getCollection().doc(shop.id).set(shop).then(() => {
      return shop;
    });
/*     this.getCollection().add({ name: "aaa"}).then(obj => {
      this.getCollection().doc(obj.id).set({...obj.get(), id: obj.id});
    }) */
  }

  filterShops(): Promise<Shop[]> {
    return this.getCollection().ref.where("active", "==", true).get().then(snapshot => snapshot?.docs.map(doc => {
      const shop = doc?.data() as Shop;
      shop.id = doc.id;
      return shop;
    }));
  }

  getShop(id: string): Promise<Shop> {
    return this.getCollection().ref.where("id", "==", id).get().then(snapshot => snapshot?.docs[0].data() as Shop)
  }

  deleteShop(shop:Shop):Promise<Shop|void>{
    return this.getCollection().doc(shop.id).update({'active': false}).then(shop =>{
      return shop;
    });
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
