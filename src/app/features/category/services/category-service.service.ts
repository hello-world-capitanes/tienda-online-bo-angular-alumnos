import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _categoryList: Category[];

  constructor() {
    this._categoryList = [
      new Category("Lácteos", "1", "Productos lácteos", true),
      new Category("Aceite", "2", "Aceites", false),
      new Category("Carne", "3", "Productos cárnicos", true),
      new Category("Pescado", "4", "Pescados", false),
      new Category("Bollería", "5", "Pescados", true),
      new Category("Alcohol", "6", "Pescados", true),
    ]
  }

  addCategory(category: Category) {
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
      this._categoryList.push(category)
    }
    console.log

  };

  categoryExists(category: Category) {
    if (this._categoryList?.some((element) => element.name === category.name)) {
      return true;
    } else {
      return false;
    };
  }

  getAllCategories(): Category[] {
    return this._categoryList;
  }

  deleteCategory(value: Category) {
    if (this._categoryList.some(element => element.id == value.id)) {
      this._categoryList.splice(this._categoryList.indexOf(value), 1);
    } else {
      return;
    }
  }

  public get cateogoryList(): Category[] {
    return this._categoryList;
  }

  public set categoryList(value: Category[]) {
    this._categoryList = value;
  }

  findById(id: string) {
    return this._categoryList.find((category) => {
      if (category.id === id) {
        return category;
      }
      return null;
    });
  }
}
