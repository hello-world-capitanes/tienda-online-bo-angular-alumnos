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
      new Category("Aceite", "Aceites", false),
      new Category("Carne", "Productos cárnicos", true),
      new Category("Pescado", "Pescados", false),
    ]
  }

  addCategory(category: Category) {
    if (this._categoryList?.some((element) => element.getName() === category.getName()) && !category.getActive()) {
      return;
    } else if (this._categoryList?.some((element) => element.getName() === category.getName()) && category.getActive()) {
      if (this._categoryList?.some((element) => element.getName() === category.getName()
        && !element.getActive())) {
        for (let i = 0; i < this._categoryList.length; i++) {
          if (this._categoryList[i].getName() === category.getName()) {
            this._categoryList[i].setActive(true);
            this._categoryList[i].setDescription(category.getDescription());
          }
        }
      } else if (this._categoryList?.some((element) => element.getName() === category.getName()
        && element.getActive())) {
        return;
      }
    } else {
      this._categoryList.push(category)
    }
    console.log

  };

  categoryExists(category: Category) {
    if (this._categoryList?.some((element) => element.getName() === category.getName())) {
      return true;
    } else {
      return false;
    };
  }

  getAllCategories(): Category[] {
    return this._categoryList;
  }

  deleteCategory(categoryRef: Category) {
    this._categoryList.splice(this._categoryList.findIndex((category) => {
      return category === categoryRef;
    }), 0);
    return this.categoryExists(categoryRef);
  }
}
