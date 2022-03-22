export class Categoria {

  private _nombre: string;
  private _ID: number;
  private _estado: boolean;
  private _descripcion: string;
  private _color: string;
  private static contadorId: number= 0;

  constructor(nombre:string, estado:boolean, descripcion:string, color:string){
    Categoria.contadorId++
    this._ID = Categoria.contadorId;
    this._color = color;
    this._descripcion = descripcion;
    this._estado = estado;
    this._nombre = nombre;
  }

  getNombre(){
    return this._nombre;
  }

  getID(){
    return this._ID;
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

  cambiarEstado()
  {
    this._estado = !this._estado;
  }

}
