import { Injectable } from '@angular/core';
import { Product } from '../models/product-models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _productList: Product[];


  constructor() {

    this._productList = [
      new Product("Steinburg", "Pack de 24 latas", "2.48", "Cerveza lagger de calidad suprema", "bebida"),
      new Product("Casón histórico", "1L de vino", "0.70", "Vino tinto para calimocho", "bebida"),
      new Product("Donuts", "Pack de 6 unidades", "4", "Donuts original glaseados", "comida"),
      new Product("Doritos", "Bolsa de 300g", "1.30", "Doritos picantes bolsa grande", "comida"),
    ]
  }

  public get productList(): Product[] {
    return this._productList;
  }
  public set productList(value: Product[]) {
    this._productList = value;
  }
}
