export class User {

  private _id: string;
  private _name: string;
  private _surname: string;
  private _email: string;
  private _active: boolean;

  constructor(id: string, name:string, surname:string, email:string, active: boolean){
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._email = email;
    this._active = active;
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

  public get surname(): string {
    return this._surname;
  }
  public set surname(value: string) {
    this._surname = value;
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    this._active = value;
  }

}
