import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop.model';

import { ShopService } from '../../shop.service';

import { ProductStock } from 'src/app/features/product/models/product-stock.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductsListShopComponent } from '../products-list-shop/products-list-shop.component';

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

  constructor(private shopService: ShopService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.shops = this.shopService.getAllShops();
  }

  deleteShop(shop: Shop){
    this.shopService.deleteShop(shop);
  }

  updateList(name: string,value: string){

  }

  openProductList(shop: Shop){
    this.shopService.setSelectedShopSeeProducts(shop);
    const dialogRef = this.dialog.open(ProductsListShopComponent,{
      height:'400px',
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  anadirElementoLista(elementoLista : any){
    this.shops.push(elementoLista);

  }

  getProductList(){
    return this._productStockList;
  }

  closeDialog(){
    this.dialog.closeAll();
  }
}
