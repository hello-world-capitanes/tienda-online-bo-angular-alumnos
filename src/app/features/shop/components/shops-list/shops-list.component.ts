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

    this.shopSub = this.shopService.getAllShops().subscribe( shops => {
        this.shops = (!!shops && shops.length > 0 ? shops : []);
    });
  }

  ngOnInit(): void {

  }

  deActivateShop(event: any, shop: Shop) {
    if (event){
      event.stopPropagation();
    }

    this.shopService.deActivateShop(shop);
  }

  activateShop(event: any, shop: Shop){
    if (event){
      event.stopPropagation();
    }

    this.shopService.activateShop(shop);
  }

  modifyShop(event: any, shopId: string){
    if (event){
      event.stopPropagation();
    }


  }

  updateList(name: string,value: string){

  }

  openProductList(shop: Shop){
    this.shopService.setSelectedShopSeeProducts(shop.name);
    const dialogRef = this.dialog.open(ProductsListShopComponent,{
      height:'400px',
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  addElementShopList(element : any){
    this.shops.push(element);
  }

  closeDialog(){
    this.dialog.closeAll();
  }
  ngOnDestroy(): void {
    this.shopSub.unsubscribe();
  }
}
