import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private _categoryList:Category[];

  constructor() {

    this._categoryList=[

    new Category("Lácteos","Productos lácteos",true),
    new Category("Aceite","Aceites",true),
    new Category("Carne","Productos cárnicos",true),
    new Category("Pescado","Pescados",false),

    ]

  }

  addCategory(category:Category){
    if(category.getActive())
    this._categoryList.push(category)
  };

  getAllCategories(): Category[]{
    return this._categoryList;
  }

  removeCategory(category:Category){
  };
}
