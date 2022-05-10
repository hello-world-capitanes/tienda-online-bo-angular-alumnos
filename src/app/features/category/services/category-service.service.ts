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

  deleteCategory(category: Category) {
    return this.getCollection().doc(category.id).update({ 'active': false });
  }

  /*filterShops(): Promise<Shop[]> {

    return this.getCollection().ref.where("active", "==", true).get().then(snapshot => snapshot?.docs.map(doc => {

      const shop = doc?.data() as Shop;

      shop.id = doc.id;

      return shop;

    }));

  }*/

  addCategory2(category: Category) {
    if (this.categoryList?.some((element) => element.name === category.name) && !category.active) {
      return;
    } else if (this.categoryList?.some((element) => element.name === category.name) && category.active) {
      if (this.categoryList?.some((element) => element.name === category.name
        && !element.active)) {
        for (let i = 0; i < this.categoryList.length; i++) {
          if (this.categoryList[i].name === category.name) {
            this.categoryList[i].active;
            this.categoryList[i].description;
          }
        }
      } else if (this.categoryList?.some((element) => element.name === category.name
        && element.active)) {
        return;
      }
    } else {
      this.categoryList?.push(category)
    }

  };

  /*categoryExists(category: Category) {
    if (this._categoryList?.some((element) => element.name === category.name)) {
      return true;
    } else {
      return false;
    };
  }*/

  getAllCategories(): Category[] {
    return this.categoryList!;
  }

  /*deleteCategory(value: Category) {
    if (this._categoryList?.some(element => element.id == value.id)) {
      this._categoryList.splice(this._categoryList.indexOf(value), 1);
    } else {
      return;
    }
  }*/

  public get cateogoryList(): Category[] {
    return this.categoryList!;
  }

  public set categoryList(value: Category[]) {
    this.categoryList = value;
  }

  findById(id: string) {
    return this.categoryList?.find((category) => {
      if (category.id === id) {
        return category;
      }
      return null;
    });
  }

  async modifyCategory(category: Category): Promise<Category> {
    if (await this.categoryExists(category)) {
      return this.getCollection().doc(category.id).set(category).then(() => {
        return category;
      });
    }
    return category;
  }

  getCategory(id: string) {
    return new Category("", "", "", true);
  }

}
