import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { Category } from '../../category/models/category.model';
import { ProductFirebase } from '../models/product-firebase.model';
import { Product } from '../models/product-models';


@Injectable({
  providedIn: 'root',
})
export class ProductService extends FirestoreService{

  protected collection!: string;
   private _productList!: Product[];

  private readonly PRODUCTS_COLLECTION = 'products';

  constructor(firestore: AngularFirestore) {
    super(firestore);
    this.collection = this.PRODUCTS_COLLECTION;

    this.getProducts().then( products => {
      this._productList = products;
    });
  }

   public get productList(): Product[] {
    return this._productList;
  }

  public set productList(value: Product[]) {
    this._productList = value;
  }

  async getProducts(): Promise<Product[]> {
    let products:Product[] = [];
    const snapshot = await this.getCollection().ref.get();
    snapshot.docs.forEach(prod => {
      products.push(prod.data() as Product);
    })
    return products;
  }

  findById(prodId: string): Product | undefined {
    return this._productList.find((product) => {
      if (product.id === prodId) {
        return product;
      }
      return null;
    });
  }


  removeCategory(product:Product, category:Category){
    let categorieList = this.getCollection().doc(product.id).collection('categories');
    console.log(categorieList.get());
  }

  getAllProducts(): Observable<Product[]> {
    return this.getCollection().valueChanges().pipe(map(product=>product as Product[]));
  }

  deleteProduct(product: Product){
    return this.getCollection().doc(product.id).update({'active': false});
  }

  activeProduct(product: Product){
    return this.getCollection().doc(product.id).update({'active': true});
  }

  async productExists(product: Product): Promise<Product | undefined> {
    const snapshot = await this.getCollection().ref.where("name", "==", product.name).get();
    return snapshot?.docs && snapshot.docs.length > 0 ? snapshot?.docs[0].data() as Product : undefined;
  }

  async addProduct(product: Product): Promise<Product | undefined>{
    if (!product) {
      throw new Error("Product not provided");
    }

    const result =await this.productExists(product)

    if(result===undefined){

      let productDB: ProductFirebase = {
        id: product.id,
        name: product.name,
        characteristics: product.characteristics,
        price: product.price,
        description: product.description,
        image: product.image,
        active: !!product?.active,
      };

      if (!!product?.categories && product.categories.length > 0) {
        for (let category of product.categories) {
          productDB.categories = [];
          if (category) {
            productDB.categories.push(Object.assign({}, category));
          }
        }
      }
      return this.getCollection().doc(product.id).set(Object.assign({}, productDB)).then(() => product)

    }
    return;


  }

  modifyProduct(id: string, newProd: Product){

    let productDB = {
      id: id,
      characteristics: newProd.characteristics,
      price: newProd.price,
      description: newProd.description,
      image: newProd.image,
    };

  return this.getCollection().doc(id).update
  ({'characteristics': productDB.characteristics, 'price': productDB.price,'description':productDB.description,'image':productDB.image});

  }
  permantlyDelete(id:string){
    if(!!id && id.length >0){
    return this.getCollection().doc(id).delete();
    }
    throw new Error();
  }
}
