import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop.model';

import { ShopService } from '../../shop.service';

import { ProductStock } from 'src/app/features/product/models/product-stock.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductsListShopComponent } from '../products-list-shop/products-list-shop.component';
import { Subscription } from 'rxjs';

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
  shopSub :Subscription;
  panelOpenState = false;

  constructor(private shopService: ShopService,public dialog: MatDialog) {

    this.shopSub = this.shopService.getAllShopsActive().subscribe( shops => {
        this.shops = (!!shops && shops.length > 0 ? shops : []);
    });
  }

  ngOnInit(): void {

  }
  deleteShop(shop: Shop) {

    this.shopService.deleteShop(shop);

  }

  activeShop(shop: Shop){
    this.shopService.activeShop(shop);
  }

  updateList(name: string,value: string){

  }
  openShopList(name: string){
    this.shopService.selectedShopSeeProducts = name;

    const dialogRef = this.dialog.open(ProductsListShopComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  anadirElementoLista(elementoLista : any){
    this.shops.push(elementoLista);
  }

  closeDialog(){
    this.dialog.closeAll();
  }
  ngOnDestroy(): void {
    this.shopSub.unsubscribe();
  }
}
