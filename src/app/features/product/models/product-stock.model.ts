import { Product } from './product-models';
export class ProductStock{

  private _product: Product;
  private _stock: number;

  constructor(product: Product, stock: number){
    this._product = product;
    this._stock = stock;
  }

  public get product(): Product {
    return this._product;
  }
  public set product(value: Product) {
    this._product = value;
  }

  public get stock(): number {
    return this._stock;
  }
  public set stock(value: number) {
    this._stock = value;
  }

}
