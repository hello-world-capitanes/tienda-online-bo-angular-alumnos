import { ProductShopFirebase } from './../../product/models/product-shop-firebase.model';
import { Address } from './../../../core/models/address.model';
import { ProductStock } from './../../product/models/product-stock.model';
export class Shop{

  private _id: string;
  private _name: string;
  private _address: Address;
  //private _cp: number[];
  private _active: boolean;
  private _products: ProductShopFirebase[];

  //TODO -> La tienda ahora solo reparte en direcciones de la misma ciudad.
  //Queda pendiente crear servicio que calcule a que CP reparte la tienda
  constructor(id:string, name: string, address: Address, active: boolean, products:ProductShopFirebase[]){
    this._id = id;
    this._name = name;
    this._address = address;
    this._active = active;
    this._products = products
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get address(): Address {
    return this._address;
  }
  public set address(value: Address) {
    this._address = value;
  }

  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    this._active = value;
  }

  public get products(): ProductShopFirebase[] {
    return this._products;
  }
  public set products(value: ProductShopFirebase[]) {
    this._products = value;
  }

}
