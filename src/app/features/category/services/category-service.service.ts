import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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
    if(this._categoryList?.some((element)=>element.getName() === category.getName()
    && !element.getActive())){

      for(let category of this._categoryList){

        if(this._categoryList?.some((element)=>element.getName() === category.getName())){
          category.setActive(true);
        }

      }

    } else if(this._categoryList?.some((element)=>element.getName() === category.getName()
    && element.getActive())){

      return ;


    } else{

      this._categoryList.push(category)

    }
  };

  getAllCategories(): Category[]{
    return this._categoryList;
  }

  removeCategory(category:Category){
  };
}
