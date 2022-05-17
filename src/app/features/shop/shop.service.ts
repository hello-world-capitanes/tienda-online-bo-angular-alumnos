import { Address } from 'src/app/core/models/address.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ProductStock } from 'src/app/features/product/models/product-stock.model';
import { SnackBarMessageComponent } from 'src/app/shared/components/snack-bar-message/snack-bar-message.component';
import { Product } from '../product/models/product-models';
import { ProductShopFirebase } from '../product/models/product-shop-firebase.model';
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
    firestore: AngularFirestore,
    protected productService: ProductService,
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
    if (!shop) {
      throw new Error('Shop has not been introduced');
    }

    if (await this.shopExistsByName(shop)) {
      throw new Error();
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

  async getShopProducts(): Promise<ProductStock[] | undefined> {
    const snapshot = await this.getCollection()
      .ref.where('name', '==', this.selectedShopSeeProducts)
      .get();
    const productsShop = snapshot?.docs[0].data()['products'] as ProductShop[];
    if (!!productsShop && productsShop.length > 0) {
      const productsStock = [];
      for (let productShop of productsShop) {
        if (!!productShop && !Number.isNaN(productShop?.id)) {
          const product = (await this.productService.findById(
            productShop?.id
          )) as Product;
          if (!!product) {
            const productStock = new ProductStock(product, productShop.stock);
            productsStock.push(productStock);
          }
        }
      }
      return productsStock;
    }
    return undefined;
  }

  async deActivateShop(shop: Shop): Promise<any> {
    if ((await this.shopExistsById(shop)).valueOf()) {
      const shop_1 = await this.getCollection()
        .doc(shop.id)
        .update({ active: false });
      return shop_1;
    } else {
      return null;
    }
  }
  async activateShop(shop: Shop): Promise<any> {
    return this.getCollection().doc(shop.id).update({ active: true });
  }

  async desactivateShop(shop: Shop): Promise<any> {
    return this.getCollection().doc(shop.id).update({ active: true });
  }

  private async applyStock(
    products: ProductShopFirebase[],
    id: string
  ): Promise<any> {
    if (!!products && !!id) {
      return this.getCollection().doc(id).update({ products: products });
    }
    throw Error('Error applying stock changed in firebase');
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

  async modifyShop(id: string, newShop: Shop) {
    if (!!id && id.length > 0 && !!newShop) {
      let address = {
        country: newShop.address.country,
        province: newShop.address.province,
        location: newShop.address.location,
        cp: newShop.address.cp,
        street: newShop.address.street,
      } as Address;
      return await this.getCollection().doc(id).update({ address: address });
    }
    throw new Error('ID not valid');
  }

  private changeStock(products: ProductStock[], id: string, units: number) {
    if (!!products && !!id && (!!units || units === 0)) {
      const p = products.find((prod) => prod.product.id === id);
      if (!!p) {
        if (p.product.active || (!p.product.active && units <= p.stock)) {
          p.stock = units;
          this.snackBar.openFromComponent(SnackBarMessageComponent, {
            data: 'Stock of ' + p.product.name + ' modificated',
            duration: 1500,
          });
        } else {
          this.snackBar.openFromComponent(SnackBarMessageComponent, {
            data: 'Stock of ' + p.product.name + ' not modificated',
            duration: 1500,
          });
        }
      }
      if (p?.stock === 0) {
        products.splice(products.indexOf(p), 1);
      }
      return products;
    }
    throw Error('Error changing stock of a product');
  }

  async modifyStock(prod: ProductStock, units: number, id: string) {
    if (prod && (!!units || units === 0) && id) {
      let products: ProductStock[] = [];
      this.getShopProducts().then((prods) => {
        if (!!prods) {
          products = prods;
        }
        products = this.changeStock(products, prod.product.id, units);
        const finalProducts = products.map((prod) => {
          return {
            id: prod.product.id,
            stock: prod.stock,
          } as ProductShopFirebase;
        });
        this.applyStock(finalProducts, id);

        return finalProducts.find((finalProd) => {
          if (prod.product.id === finalProd.id) {
            return prod.stock;
          }
          return -1;
        });
      });
    }
  }
  async permantlyDelete(id: string) {
    if (!!id && id.length > 0) {
      return await this.getCollection().ref.doc(id).delete();
    }
    throw new Error('Shop id is not valid or undefined');
  }
}
