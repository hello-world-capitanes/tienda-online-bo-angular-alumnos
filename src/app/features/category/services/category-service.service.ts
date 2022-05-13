import { ProductService } from './../../product/services/product.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends FirestoreService {
  protected collection: string;
  private readonly CATEGORY_COLLECTION = 'categories'

  constructor(firestore: AngularFirestore, private _productService: ProductService) {
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
        products: category.products,
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

  deleteCategory(category: Category) {
    /* this._productService.deleteCategories(category); */
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

}
