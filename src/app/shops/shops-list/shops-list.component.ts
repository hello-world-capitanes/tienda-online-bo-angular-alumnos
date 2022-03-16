import { Component, OnInit } from '@angular/core';

export interface shopElement{
  name: string;
  value: number;
}
@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.scss']
})
export class ShopsListComponent implements OnInit {

  shops: shopElement[] = [
    {name:"Shop1", value:1},
    {name:"Shop2", value:2},
    {name:"Shop3", value:3},
  ]
  constructor() { }

  ngOnInit(): void {
  }

  deleteShop(shop:shopElement){
    this.shops.splice(this.shops.indexOf(shop),1);
  }
  updateList(name:string,value:string){

  }

  anadirElementoLista(elementoLista : any){
    this.shops.push(elementoLista);

  }

}
