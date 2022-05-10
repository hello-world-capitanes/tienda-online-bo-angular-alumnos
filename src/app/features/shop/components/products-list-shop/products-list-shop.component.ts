import { Subscription } from 'rxjs';
import { ShopsListComponent } from './../shops-list/shops-list.component';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop.model';
import { ShopService } from '../../shop.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-products-list-shop',
  templateUrl: './products-list-shop.component.html',
  styleUrls: ['./products-list-shop.component.scss'],
})
export class ProductsListShopComponent implements OnInit {
  shop!: Shop;
  //TODO
  constructor(private shopService: ShopService, public dialogRef: MatDialogRef<ShopsListComponent>,) {
   this.shopService.getShop(shopService.selectedShopSeeProducts).then( shop => {
      this.shop = shop;
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
