import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ProductStock } from 'src/app/features/product/models/product-stock.model';
import { SnackBarMessageComponent } from 'src/app/shared/components/snack-bar-message/snack-bar-message.component';
import { ProductShop } from './../product/models/product-shop';
import { ProductService } from './../product/services/product.service';
import { Shop } from './models/shop.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService extends FirestoreService {
  protected collection: string;
  private readonly SHOP_COLLECTION = 'shops';

  selectedShopSeeProducts!: string;

  constructor(
    productService: ProductService,
    firestore: AngularFirestore,
    public snackBar: MatSnackBar
  ) {
    super(firestore);
    this.collection = this.SHOP_COLLECTION;
  }

  getAllShops(): Observable<Shop[]> {
    return this.getCollection()
      .valueChanges()
      .pipe(map((shops) => shops as Shop[]));
  }

  getAllShopsActive(): Observable<Shop[]> {
    //return this.getCollection().get().pipe(map(snapshot => snapshot?.docs.map(shop => shop.data() as Shop)));
    return this.getCollection()
      .valueChanges()
      .pipe(
        map((shops) => shops.filter((shop) => shop['active'] == true) as Shop[])
      );
  }

  async addShop(shop: Shop): Promise<Shop> {
    if(!shop){
      throw new Error('Shop has not been introduced');
    }
    if (await this.shopExistsByName(shop)) {
      throw new Error('Shop already exists');
    } else {
      let newShop = {
        id: this.firestore.createId(),
        name: shop.name,
        address: {
          country: shop.address.country,
          province: shop.address.province,
          location: shop.address.location,
          cp: shop.address.cp,
          street: shop.address.street,
        },
        active: shop.active,
        products: shop.products,
      };

      return this.getCollection()
        .doc(newShop.id)
        .set(newShop)
        .then(() => {
          return newShop as Shop;
        });
    }

    /*     this.getCollection().add({ name: "aaa"}).then(obj => {
    this.getCollection().doc(obj.id).set({...obj.get(), id: obj.id});
  }) */
  }

  async filterShops(): Promise<Shop[]> {
    const snapshot = await this.getCollection()
      .ref.where('active', '==', true)
      .get();
    return snapshot?.docs.map((doc) => {
      const shop = doc?.data() as Shop;
      shop.id = doc.id;
      return shop;
    });
  }

  async getShop(name: string): Promise<Shop> {
    if (!!name && name.length > 0) {
      const snapshot = await this.getCollection()
        .ref.where('name', '==', name)
        .get();
      if (!!snapshot.docs && snapshot.docs.length > 0) {
        return snapshot?.docs[0].data() as Shop;
      }
      throw new Error();
    }
    throw new Error();
  }

  async getShopProducts(): Promise<ProductShop[]> {
    const snapshot = await this.getCollection()
      .ref.where('name', '==', this.selectedShopSeeProducts)
      .get();
    return snapshot?.docs[0].data()['products'] as ProductShop[];
  }

  async deleteShop(shop: Shop): Promise<any> {
    if ((await this.shopExistsById(shop)).valueOf()) {
      const shop_1 = await this.getCollection()
        .doc(shop.id)
        .update({ active: false });
      return shop_1;
    } else {
      return null;
    }
  }
  async activeShop(shop: Shop): Promise<any> {
    return this.getCollection().doc(shop.id).update({ active: true });
  }

  async applyStock(products: ProductShop[]): Promise<any> {
    return this.getCollection()
      .doc(this.selectedShopSeeProducts)
      .update({ products: products });
  }

  async shopExistsById(shop: Shop): Promise<boolean> {
    return (await this.getCollection().ref.doc(shop.id).get()).exists;
  }

  async shopExistsByName(shop: Shop): Promise<Shop | undefined> {
    const snapshot = await this.getCollection()
      .ref.where('name', '==', shop.name)
      .get();
    return snapshot?.docs && snapshot.docs.length > 0
      ? (snapshot?.docs[0].data() as Shop)
      : undefined;
  }

  setSelectedShopSeeProducts(value: string) {
    this.selectedShopSeeProducts = value;
  }

  changeStock(products: ProductShop[], id: string, units: number) {
    products.find((prod) => {
      if (prod.id === id) {
        prod.stock == units;
      }
    });
  }

  async modifyStock(prod: ProductStock, units: number) {
    let products: ProductShop[] = [];
    this.getShopProducts().then((prods) => {
      products = prods;
      this.changeStock(products, prod.product.id, units);
      this.applyStock(products);

      this.snackBar.openFromComponent(SnackBarMessageComponent, {
        data: 'Stock del producto ' + prod.product.name + ' modificado',
        duration: 1500,
      });
      return prod.stock;
    });
  }
  async permantlyDelete(id:string){
    if(!!id && id.length>0){
      return await this.getCollection().ref.doc(id).delete();
    }
    throw new Error('Shop id is not valid or undefined');
  }
}
