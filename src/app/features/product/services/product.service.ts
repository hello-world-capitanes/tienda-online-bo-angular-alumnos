import { identifierName } from '@angular/compiler';
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
  private _productList: Product[];

  private readonly PRODUCTS_COLLECTION = 'products';

  constructor(firestore: AngularFirestore) {
    super(firestore);
    this.collection = this.PRODUCTS_COLLECTION;
    this._productList = [
      new Product(
        '1',
        'Steinburg',
        'Pack de 24 latas',
         2.48,
        'Cerveza lagger de calidad suprema',
        [
        new Category("Carne", "3", "Productos cárnicos", true),
        new Category("Alcohol", "6", "Pescados", true)
        ],
        'https://a1.soysuper.com/4d20a10aab11ff0e321b129feac2401e.1500.0.0.0.wmark.8d2b900a.jpg',
        true
      ),

      new Product(
        '2',
        'Casón histórico',
        '1L de vino',
         0.7,
        'Vino tinto para calimocho',
        [
          new Category("Carne", "3", "Productos cárnicos", true),
          new Category("Alcohol", "6", "Pescados", true)
        ],
        'https://mailenmarket.com/wp-content/uploads/2020/07/6c371039587b41d08078d3d78de1d835.jpg',
        true
      ),
      new Product(
        '3',
        'Donuts',
        'Pack de 6 unidades',
         4,
        'Donuts original glaseados',
        [new Category("Carne", "3", "Productos cárnicos", true),
        new Category("Alcohol", "6", "Pescados", true)
        ],
        'https://m.media-amazon.com/images/I/910x9xh3rcL._AC_SL1500_.jpg',
        true
      ),
      new Product(
        '4',
        'Doritos',
        'Bolsa de 300g',
         1.3,
        'Doritos picantes bolsa grande',
        [new Category("Carne", "3", "Productos cárnicos", true),
        new Category("Alcohol", "6", "Pescados", true)
        ],
        'https://agustomarket.com/wp-content/uploads/2021/12/doritos-bolsaza-300x300.jpg',
        true
      ),
    ];
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

  getCategories(product: Product){

  }

  findByName(prod: Product): Product | undefined {
    return this.productList.find((product) =>{
      if(product.name === prod.name){
        return product;
      }
      return null;
    });
  }

  removeCategory(product:Product,category:Category){
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

    let productDB: ProductFirebase = {
      id: product.id,
      name: product.name,
      characteristics: product.characteristics,
      price: product.price,
      description: product.description,
      image: product.image,
      active: product.active,
    };

    if (!!product?.categories && product.categories.length > 0) {
      for (let category of product.categories) {
        productDB.categories = [];
        if (category) {
          productDB.categories.push(Object.assign({}, category));
        }
      }
    }
    return this.getCollection().doc(product.id).set(Object.assign({}, productDB)).then(() => {
      return productDB;
    })
  }
  permantlyDelete(id:string){
    if(!!id && id.length >0){
    return this.getCollection().doc(id).delete();
    }
    throw new Error();
  }
}
