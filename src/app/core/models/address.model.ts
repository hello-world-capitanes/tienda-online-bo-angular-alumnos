export class Address{

  private _country: string;
  private _province: string;
  private _location: string;
  private _cp: number;

  constructor(country: string, province: string, location: string, cp: number){
    this._country = country;
    this._province = province;
    this._location = location;
    this._cp = cp;
  }

  public get country(): string {
    return this._country;
  }
  public set country(value: string) {
    this._country = value;
  }

  public get province(): string {
    return this._province;
  }
  public set province(value: string) {
    this._province = value;
  }

  public get location(): string {
    return this._location;
  }
  public set location(value: string) {
    this._location = value;
  }

  public get cp(): number {
    return this._cp;
  }
  public set cp(value: number) {
    this._cp = value;
  }

}
