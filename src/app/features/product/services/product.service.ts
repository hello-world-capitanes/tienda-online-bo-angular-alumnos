import { Injectable } from '@angular/core';
import { elementAt } from 'rxjs';
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
        'bebida',
        '',
        true
      ),

      new Product(
        '2',
        'Casón histórico',
        '1L de vino',
        0.7,
        'Vino tinto para calimocho',
        'bebida',
        '',
        true
      ),
      new Product(
        '3',
        'Donuts',
        'Pack de 6 unidades',
        4,
        'Donuts original glaseados',
        'comida',
        '',
        true
      ),
      new Product(
        '4',
        'Doritos',
        'Bolsa de 300g',
        1.3,
        'Doritos picantes bolsa grande',
        'comida',
        '',
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
}
