import { Category } from "../../category/models/category.model";

export class Product {
  private _id: string;
  private _name: string;
  private _characteristics: string;
  private _price: number;
  private _description: string;
  private _categories: Category[];
  private _image: string;
  private _active?: boolean | undefined;

  constructor(
    id:string,
    name: string,
    characteristics: string,
    price: number,
    description: string,
    categories: Category[],
    image: string,
    active: boolean | undefined
  ) {
    this._id = id;
    this._name = name;
    this._characteristics = characteristics;
    this._price = price;
    this._description = description;
    this._categories = categories;
    this._image = image;
    if(!active){
      this._active = false;
    }else{
      this._active = active;
    }
  }

  public get id() {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get characteristics() {
    return this._characteristics;
  }

  public set characteristics(characteristics: string) {
    this._characteristics = characteristics;
  }

  public get price() {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }

  public get description() {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get categories() {
    return this._categories;
  }

  public set categories(categories: Category[]) {
    this._categories = categories;
  }

  public get image() {
    return this._image;
  }

  public set image(image: string) {
    this._image = image;
  }

  public get active(): boolean | undefined {
    return this._active;
  }

  public set active(active: boolean | undefined) {
    this._active = active;
  }
}
