export class Category {

  private _name: string;
  //private _ID: number;
  private _active: boolean;
  private _description: string;
  private static contadorId: number= 0;

  constructor(name:string, description:string, active:boolean){
    //this._ID = Categoria.contadorId;
    this._description = description;
    this._active = active;
    this._name = name;
  }

  getName(){
    return this._name;
  }

  setName(name:string){
    this._name=name;
  }

 /*  getID(){
    return this._ID;
  }*/

  getActive(){
    return this._active;
  }

  setActive(active:boolean){
    this._active=active;
  }

  getDescription(){
    return this._description;
  }

  setDescription(description:string){
    this._description=description;
  }

}
