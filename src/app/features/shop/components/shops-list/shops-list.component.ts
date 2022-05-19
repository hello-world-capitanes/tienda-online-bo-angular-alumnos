import { ModifyCategoryComponent } from './../../../category/components/categories/modifyCategory/modify-category/modify-category.component';
import { ModifyInfoShopsComponent } from './../modify-info-shops/modify-info-shops.component';
import { ShopsModifyComponent } from './../shops-modify/shops-modify.component';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop.model';

import { ShopService } from '../../shop.service';

import { ProductStock } from 'src/app/features/product/models/product-stock.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductsListShopComponent } from '../products-list-shop/products-list-shop.component';
import { Subscription } from 'rxjs';
import { ModifyProductsShopComponent } from '../modify-products-shop/modify-products-shop.component';

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


  openProductList(shop: Shop){
    this.shopService.setSelectedShopSeeProducts(shop.name);
    const dialogRef = this.dialog.open(ProductsListShopComponent,{
      height:'600px',
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  openModifyProducts(shop: Shop){
    this.shopService.setSelectedShopSeeProducts(shop.name);
    const dialogRef = this.dialog.open(ModifyProductsShopComponent,{
      height:'800px',
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

  findById(id: string): Shop | undefined{
    return this.shops?.find((shop) => {
      if(shop.id === id){
        return shop;
      }
      return null;
    })
  }

  modifyShop(id: string){
    let shop = this.findById(id);
    const dialogRef = this.dialog.open(ModifyInfoShopsComponent, {
      width: '350px',
      data: {
        id: id,
        name: shop?.name,
        address: shop?.address,
        active: shop?.active,
        products: shop?.products
      }
    });
    if(!!shop){
      dialogRef.componentInstance.id = id;
      dialogRef.componentInstance.name = shop?.name;
      dialogRef.componentInstance.active = shop?.active;
      dialogRef.componentInstance.productsStock = shop?.products;
    }
  }
}
