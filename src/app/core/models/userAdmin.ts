export class UserAdmin {
  private _uid: string;
  private _email: string;
  private _displayName: string;
  private _photoURL: string;
  private _emailVerified: boolean;

  constructor(uid: string, email: string, displayName: string, photoURL: string, emailVerified: boolean) {
    this._uid = uid;
    this._email = email;
    this._displayName = displayName;
    this._photoURL = photoURL;
    this._emailVerified = emailVerified;
  }

  public get uid(): string {
    return this._uid;
  }
  public set uid(value: string) {
    this._uid = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get displayName(): string {
    return this._displayName;
  }
  public set displayName(value: string) {
    this._displayName = value;
  }
  public get photoURL(): string {
    return this._photoURL;
  }
  public set photoURL(value: string) {
    this._photoURL = value;
  }
  public get emailVerified(): boolean {
    return this._emailVerified;
  }
  public set emailVerified(value: boolean) {
    this._emailVerified = value;
  }
}