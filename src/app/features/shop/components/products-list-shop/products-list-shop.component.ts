import { Subscription } from 'rxjs';
import { ShopsListComponent } from './../shops-list/shops-list.component';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop.model';
import { ShopService } from '../../shop.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductStock } from 'src/app/features/product/models/product-stock.model';
import { SHOP_CONSTANTS } from '../../models/shop.constants';

@Component({
  selector: 'app-products-list-shop',
  templateUrl: './products-list-shop.component.html',
  styleUrls: ['./products-list-shop.component.scss'],
})
export class ProductsListShopComponent implements OnInit {
  shop!: Shop;
  maxInput = SHOP_CONSTANTS.stock.max;
  minInput = SHOP_CONSTANTS.stock.min;
  stepInput = SHOP_CONSTANTS.stock.step;

  constructor(private shopService: ShopService, public dialogRef: MatDialogRef<ShopsListComponent>) {
   this.shopService.getShop().then( shop => {
      this.shop = shop;
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeStock(product:ProductStock,units:string){
    let newStock = Number.parseInt(units);
    return this.shopService.modifyStock(product,newStock);
  }
  
}
