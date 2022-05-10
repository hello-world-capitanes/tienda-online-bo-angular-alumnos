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

  /*public addProduct(value: Product){
    this._productList.push(value);
  }*/

  /*public deleteProduct(value: Product){

    if (this._productList.some( element => element.id == value.id)){
      this.productList.splice(this._productList.indexOf(value), 1);

    } else {
      return;
    }
  }*/

  public get productList(): Product[] {
    return this._productList;
  }

  public set productList(value: Product[]) {
    this._productList = value;
  }

  findById(prodId: string): Product | undefined {
    return this._productList.find((product) => {
      if (product.id === prodId) {
        return product;
      }
      return null;
    });
  }

  findByName(prod: Product): Product | undefined {
    return this.productList.find((product) =>{
      if(product.name === prod.name){
        return product;
      }
      return null;
    });
  }

  removeCategory(product:Product,category:string){
    //Se busca la categoria dentro del producto y se borra
    let indexProduct = this.productList.indexOf(product);
    let indexCategory = this.productList[indexProduct].categories.indexOf(category)
    this.productList[indexProduct].categories.splice(indexCategory,1);
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

  addProduct(product: Product){
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

  modifyProduct(id: string, newProd: Product){
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

}
