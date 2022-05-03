import { Injectable } from '@angular/core';
import { elementAt } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { Product } from '../models/product-models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _productList: Product[];

  constructor() {
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

  public addProduct(value: Product){
    this._productList.push(value);
  }

  public deleteProduct(value: Product){

    if (this._productList.some( element => element.id == value.id)){
      this.productList.splice(this._productList.indexOf(value), 1);

    } else {
      return;
    }
  }

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

  getAllProducts(): Product[] {
    return this._productList;
  }

  findByName(prod: Product): Product | undefined {
    return this.productList.find((product) =>{
      if(product.name === prod.name){
        return product;
      }
      return null;
    });
  }
}
