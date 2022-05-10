import { CategoryService } from 'src/app/features/category/services/category-service.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ProductDB } from './../models/productDB.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { elementAt, map, Observable } from 'rxjs';
import { APIServiceService } from 'src/app/core/services/apiservice.service';
import { Category } from '../../category/models/category.model';
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

  async addProduct(product: Product){

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
        return productDB;
      })
    }
    return;


  }

  async modifyProduct(id: string, newProd: Product){

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
        return productDB;
      })
    }
    return;

  }

}
