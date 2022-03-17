export class Product {
  private _name: string;
  private _characteristics: string;
  private _price: string;
  private _description: string;
  private _categories: string;

  constructor(name: string, characteristics: string, price: string, description: string, categories: string) {
    this._name = name;
    this._characteristics = characteristics;
    this._price = price;
    this._description = description;
    this._categories = categories;
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

  public set price(price: string) {
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

  public set categories(categories: string) {
    this._categories = categories;
  }
}
