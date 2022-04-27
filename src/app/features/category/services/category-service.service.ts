import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _categoryList: Category[];

  constructor() {
    this._categoryList = [
      new Category("Lácteos", "Productos lácteos", true),
      new Category("Aceite", "Aceites", true),
      new Category("Carne", "Productos cárnicos", true),
      new Category("Pescado", "Pescados", false),
    ]
  }

  addCategory(category: Category) {
    if (this._categoryList?.some((element) => element.getName() === category.getName()
      && !element.getActive())) {
      for (let category of this._categoryList) {
        if (this._categoryList?.some((element) => element.getName() === category.getName())) {
          category.setActive(true);
        }
      }
    } else if (this._categoryList?.some((element) => element.getName() === category.getName()
      && element.getActive())) {
      return;
    } else {
      this._categoryList.push(category)
    }
  };

  categoryExists(category: Category) {
    if (this._categoryList.includes(category)) {
      return true;
    } else {
      return false;
    };
  }

  getAllCategories(): Category[] {
    return this._categoryList;
  }

  deleteCategory(categoryRef: Category) {
    this._categoryList.splice(this._categoryList.findIndex((category)=>{
      return category === categoryRef;
    }),0);
    return this.categoryExists(categoryRef);
  }
}
