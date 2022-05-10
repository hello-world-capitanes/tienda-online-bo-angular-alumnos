export class User {
  private _id: string;
  private _name: string;
  private _surname: string;
  private _email: string;
  private _active: boolean;

  constructor(id: string, name: string, surname: string, email: string) {
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._email = email;
    this._active = true;
  }

  get name(): string {
    return this._name;
  }

  get surname(): string {
    return this._surname;
  }

  get email(): string {
    return this._email;
  }

  get active(): boolean {
    return this._active;
  }

  get id(): string{
    return this._id;
  }
}
