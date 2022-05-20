
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { Product } from '../../product/models/product-models';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends FirestoreService {
  protected collection: string;
  private readonly CATEGORY_COLLECTION = 'categories';

  selectedCategorySeeProducts!: string;

  constructor(firestore: AngularFirestore) {
    super(firestore)
    this.collection = this.CATEGORY_COLLECTION;
  }
  /**
   *
   * @returns an array of Categories
   */
  getCategories(): Observable<Category[]> {
    return this.getCollection().valueChanges().pipe(map(category => category as Category[]));
  }

  /**
   *
   * @param category
   * @returns category with DB id
   */

  async addCategory(category: Category): Promise<Category | undefined> {
    const result = await this.categoryExists(category)
    if (result === undefined) {
      category.id = this.firestore.createId();
      let categoryDB = {
        id: category.id,
        name: category.name,
        description: category.description,
        active: category.active,
      };
      return this.getCollection().doc(category.id).set(Object.assign({}, categoryDB)).then(() => {
        return categoryDB as Category;
      })
    }
    return;
  }

  async categoryExists(category: Category): Promise<Category | undefined> {
    const snapshot = await this.getCollection().ref.where("name", "==", category.name).get();
    return snapshot?.docs && snapshot.docs.length > 0 ? snapshot?.docs[0].data() as Category : undefined;
  }

  async categoryExistsById(category: Category): Promise<Category | undefined> {
    const snapshot = await this.getCollection().ref.where("id", "==", category.id).get();
    return snapshot?.docs && snapshot.docs.length > 0 ? snapshot?.docs[0].data() as Category : undefined;
  }

  deleteCategory(category: Category) {
    return this.getCollection().doc(category.id).update({ 'active': false });
  }

  activeCategory(category: Category) {
    return this.getCollection().doc(category.id).update({ 'active': true });
  }

  /*filterShops(): Promise<Shop[]> {
    return this.getCollection().ref.where("active", "==", true).get().then(snapshot => snapshot?.docs.map(doc => {
      const shop = doc?.data() as Shop;
      shop.id = doc.id;
      return shop;
    }));
  }*/

  async modifyCategory(id: string, newCat: Category): Promise<Category|undefined> {
    let categoryBD = {
      id: id,
      name: newCat.name,
      description: newCat.description,
      active: newCat.active,
    };
    return this.getCollection().doc(id).set(Object.assign({}, categoryBD)).then(() => {
      return categoryBD as Category;
    })
  }

  setSelectedCategorySeeProducts(value: string){
    this.selectedCategorySeeProducts = value;
  }

  async getCategory(name: string): Promise<Category>{
    if (!!name && name.length > 0) {
      const snapshot = await this.getCollection()
        .ref.where('name', '==', name)
        .get();
      if (!!snapshot.docs && snapshot.docs.length > 0) {
        return snapshot?.docs[0].data() as Category;
      }
      throw new Error();
    }
    throw new Error();
  }

  async getCategoryProducts(id: string): Promise<Product[] | undefined>{
    const snapshot = await this.getCollection()
      .ref.where('id', '==', id)
      .get();
    console.log(this.selectedCategorySeeProducts)
    const productsCats = this.findProductByCategory(id);
    console.log("productsCats: " + productsCats)
    if (!!productsCats && (await productsCats).length > 0) {
      const productList = [];
      for (let productCat of await productsCats) {
        if (!!productCat && !Number.isNaN(productCat?.id)) {
            const product = (await this.findProductById(productCat?.id)) as Product;
            if(!!product){
              productList.push(product)
            }
        }
      }
      return productList;
    }
    return undefined;
  }

  async findProductById(id: string): Promise<Product | undefined>{
    if(!!id && id.length > 0){
      const snapshot = await this.firestore.collection('products').doc(id).ref.get();
      if(!!snapshot){
        return snapshot?.data() as Product;
      }
      throw new Error();
    }
    throw new Error();
  }

  async findProductByCategory(idCat: string): Promise<Product[]>{
    const prodList: Product[] | any = [];
    if(!!idCat && idCat.length > 0){
      let products = this.getProducts();
      if(!!products){
        (await products).forEach((prod) => {
          for(let i = 0; i < prod.categories.length; i++){
            if(prod.categories[i].id === idCat){
              prodList.push(prod);
            }
          }
        })
        return prodList;
      }
      throw new Error();
    }
    throw new Error();
  }

  async getProducts(): Promise<Product[]>{
    let products: Product[] = [];
    const snapshot = await this.firestore.collection('products').ref.get();
    snapshot.docs.forEach((prod) => {
      products.push(prod.data() as Product);
    });
    return products;
  }



}
