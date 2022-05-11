export class ProductShop{

  private _id: string;
  private _stock: number;

  constructor(id: string, stock: number){
    this._id = id;
    this._stock = stock;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get stock(): number {
    return this._stock;
  }
  public set stock(value: number) {
    this._stock = value;
  }

}
