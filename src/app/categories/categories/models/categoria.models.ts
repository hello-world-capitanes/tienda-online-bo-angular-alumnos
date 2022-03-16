

export class Categoria {

  private _nombre: string;
  private _ID: number;
  private _displayName: string;
  private _estado: boolean;
  private _descripcion: string;
  private _color: string;



  constructor(nombre:string, ID:number, displayName:string, estado:boolean, descripcion:string, color:string){

      this._ID = ID;
      this._color = color;
      this._descripcion = descripcion;
      this._displayName = displayName;
      this._estado = estado;
      this._nombre = nombre;
  }

  getNombre(){
    return this._nombre;
  }

  getID(){
    return this._ID;
  }

  getDisplayName(){
    return this._displayName;
  }

  getEstado(){
    return this._estado;
  }

  getDescripcion(){
    return this._descripcion;
  }

  getColor(){
    return this._color;
  }



}
