import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop.model';

import { ShopService } from '../../shop.service';

import { ProductStock } from 'src/app/features/product/models/product-stock.model';

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
  shops!: Shop[];
  panelOpenState=false;

  private _productStockList! : ProductStock[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shops = this.shopService.getAllShops();
  }

  deleteShop(shop: Shop){
    this.shopService.deleteShop(shop);
  }
  updateList(name:string,value:string){

  }

  anadirElementoLista(elementoLista : any){
    this.shops.push(elementoLista);

  }

  getProductList(){
    return this._productStockList;
  }

}
