import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends FirestoreService{
  protected collection: string;
  private readonly CATEGORY_COLLECTION='categories'

  private _categoryList?: Category[];

  constructor(firestore: AngularFirestore) {
    super(firestore)
    this.collection=this.CATEGORY_COLLECTION;

  }
  /**
   *
   * @returns an array of Categories
   */
  getCategories(): Observable<Category[]> {
    return this.getCollection().valueChanges().pipe(map(category=>category as Category[]));
  }

  /**
   *
   * @param category
   * @returns category with DB id
   */
   async addCategory(category: Category): Promise<Category> {

    if(await this.categoryExists(category)){
      category.id = this.firestore.createId();
      return this.getCollection().doc(category.id).set(category).then(() => {
        return category;
      });
    }

    return category;

  }

  async categoryExists(category: Category){
    let categoryExist = (await this.getCollection().ref.doc(category.id).get()).exists;
    return categoryExist;
  }

  deleteCategory(category:Category){
    return this.getCollection().doc(category.id).update({'active': false});
  }

  /*filterShops(): Promise<Shop[]> {

    return this.getCollection().ref.where("active", "==", true).get().then(snapshot => snapshot?.docs.map(doc => {

      const shop = doc?.data() as Shop;

      shop.id = doc.id;

      return shop;

    }));

  }*/

  addCategory2(category: Category) {
    if (this._categoryList?.some((element) => element.name === category.name) && !category.active) {
      return;
    } else if (this._categoryList?.some((element) => element.name === category.name) && category.active) {
      if (this._categoryList?.some((element) => element.name === category.name
        && !element.active)) {
        for (let i = 0; i < this._categoryList.length; i++) {
          if (this._categoryList[i].name === category.name) {
            this._categoryList[i].active;
            this._categoryList[i].description;
          }
        }
      } else if (this._categoryList?.some((element) => element.name === category.name
        && element.active)) {
        return;
      }
    } else {
      this._categoryList?.push(category)
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
    return this._categoryList!;
  }

  /*deleteCategory(value: Category) {
    if (this._categoryList?.some(element => element.id == value.id)) {
      this._categoryList.splice(this._categoryList.indexOf(value), 1);
    } else {
      return;
    }
  }*/

  public get cateogoryList(): Category[] {
    return this._categoryList!;
  }

  public set categoryList(value: Category[]) {
    this._categoryList = value;
  }

  findById(id: string) {
    return this._categoryList?.find((category) => {
      if (category.id === id) {
        return category;
      }
      return null;
    });
  }
  getCategory(id:string){
    return new Category("","","",true);
  }
}
