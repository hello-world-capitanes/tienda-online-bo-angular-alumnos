import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { CategoryService } from 'src/app/features/category/services/category-service.service';
import { Product } from '../models/product-models';


@Injectable({
  providedIn: 'root',
})
export class ProductService extends FirestoreService{

  protected collection!: string;
  private _productList!: Product[];

  private readonly PRODUCTS_COLLECTION = 'products';

  constructor(firestore: AngularFirestore,
              private categoryService: CategoryService) {
    super(firestore);
    this.collection = this.PRODUCTS_COLLECTION;
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

    const result =await this.productExists(product)

    if(result===undefined){
      product.id = this.firestore.createId();

      let productDB = {
        id: product.id,
        name: product.name,
        characteristics: product.characteristics,
        price: product.price,
        description: product.description,
        categories: product.categories,
        image: product.image,
        active: product.active,
      };

        return this.getCollection().doc(product.id).set(Object.assign({}, productDB)).then(() => {
          return productDB as Product;
        })
    }
    return;


  }

  async modifyProduct(id: string, newProd: Product):Promise<Product | undefined>{

    const result =await this.productExists(newProd)

    if(result===undefined){

      let productDB = {
        id: id,
        name: newProd.name,
        characteristics: newProd.characteristics,
        price: newProd.price,
        description: newProd.description,
        categories: newProd.categories,
        image: newProd.image,
        active: newProd.active,
      };
      return this.getCollection().doc(id).set(Object.assign({}, productDB)).then(() => {
        return productDB as Product;
      })
    }
    return;

  }
  permantlyDelete(id:string){
    if(!!id && id.length >0){
    return this.getCollection().doc(id).delete();
    }
    throw new Error();
  }
}
