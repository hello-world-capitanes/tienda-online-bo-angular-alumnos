export class Category {

  private _name: string;
  private _ID: string;
  private _description: string;
  private _active: boolean;
  /* private static contadorId: number = 0; */

  constructor(name: string, id: string, description: string, active: boolean) {
    this._ID = id;
    this._name = name;
    this._description = description;
    this._active = active;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get id() {
    return this._ID;
  }

  public set id(id: string) {
    this._ID = id;
  }

  public get description() {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get active() {
    return this._active;
  }

  public set active(active: boolean) {
    this._active = active;
  }
}
