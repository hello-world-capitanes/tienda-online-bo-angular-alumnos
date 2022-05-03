export class Province{

  private _name: string;
  private _cod: string;

  constructor(name: string, cod: string){
    this._name = name;
    this._cod = cod;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get cod(): string {
    return this._cod;
  }
  public set cod(value: string) {
    this._cod = value;
  }

}

export const PROVINCES = [
  {name: "Álava", cod: '01'} as Province,
  {name: "Albacete", cod: '02'} as Province,
  {name: "Alicante", cod: '03'} as Province,
  {name: "Almería", cod:'04'} as Province,
  {name: "Asturias", cod: '33'} as Province,
  {name: "Ávila", cod: '05'} as Province,
  {name: "Badajoz", cod: '06'} as Province,
  {name: "Barcelona", cod: '08'}as Province,
  {name: "Burgos", cod: '09'}as Province,
  {name: "Cáceres", cod: '10'}as Province,
  {name: "Cádiz", cod: '11'}as Province,
  {name: "Cantabria", cod: '39'}as Province,
  {name: "Castellón", cod: '12'}as Province,
  {name: "Ciudad Real", cod: '13'}as Province,
  {name: "Córdoba", cod: '14'}as Province,
  {name: "A Coruña", cod: '15'}as Province,
  {name: "Cuenca", cod: '16'}as Province,
  {name: "Gerona", cod: '17'}as Province,
  {name: "Granada", cod: '18'}as Province,
  {name: "Guadalajara", cod: '19'}as Province,
  {name: "Guipúzcoa", cod: '20'}as Province,
  {name: "Huelva", cod: '21'}as Province,
  {name: "Huesca", cod: '22'}as Province,
  {name: "Islas Baleares", cod: '07'}as Province,
  {name: "Jaén", cod: '23'}as Province,
  {name: "León", cod: '24'}as Province,
  {name: "Lérida", cod: '25'}as Province,
  {name: "Lugo", cod: '27'}as Province,
  {name: "Madrid", cod: '28'}as Province,
  {name: "Murcia", cod: '30'}as Province,
  {name: "Navarra", cod: '31'}as Province,
  {name: "Orense", cod: '32'}as Province,
  {name: "Palencia", cod: '34'}as Province,
  {name: "Las Palmas", cod: '35'}as Province,
  {name: "Pontevedra", cod: '36'}as Province,
  {name: "La Rioja", cod: '26'}as Province,
  {name: "Salamanca", cod: '37'}as Province,
  {name: "Segovia", cod: '40'}as Province,
  {name: "Sevilla", cod: '41'}as Province,
  {name: "Soria", cod: '42'}as Province,
  {name: "Tarragona", cod: '43'}as Province,
  {name: "Santa Cruz de Tenerife", cod: '38'}as Province,
  {name: "Teruel", cod: '44'}as Province,
  {name: "Toledo", cod: '45'}as Province,
  {name: "Valencia", cod: '46'}as Province,
  {name: "Valladolid", cod: '47'}as Province,
  {name: "Vizcaya", cod: '48'}as Province,
  {name: "Zamora", cod: '49'}as Province,
  {name: "Zaragoza", cod: '50'}as Province,
  {name: 'Ceuta', cod: '51'} as Province,
  {name: 'Melilla', cod: '52'} as Province
]
