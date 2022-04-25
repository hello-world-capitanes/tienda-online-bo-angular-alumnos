import { Injectable } from '@angular/core';
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

  public get productList(): Product[] {
    return this._productList;
  }
  public set productList(value: Product[]) {
    this._productList = value;
  }

  addProduct(prod: Product) {
    this._productList.push(prod);
  }

  deleteProduct(index: number) {
    this._productList.splice(index, 1);
  }

  findById(prodId: string) {
    return this._productList.find((product) => {
      if (product.id === prodId) {
        return product;
      }
      return null;
    });
  }
}
