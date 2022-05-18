import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductShop } from 'src/app/features/product/models/product-shop';
import { ProductStock } from 'src/app/features/product/models/product-stock.model';
import { setTimeout } from 'timers';
import { SHOP_CONSTANTS } from '../../models/shop.constants';
import { Shop } from '../../models/shop.model';
import { ShopService } from '../../shop.service';
import { Product } from './../../../product/models/product-models';
import { ProductService } from './../../../product/services/product.service';
import { ShopsListComponent } from './../shops-list/shops-list.component';

@Component({
  selector: 'app-products-list-shop',
  templateUrl: './products-list-shop.component.html',
  styleUrls: ['./products-list-shop.component.scss'],
})
export class ProductsListShopComponent implements OnInit {
  shop!: Shop;
  showProducts!: ProductStock[];
  isLoaded = false;
  isLoading = true;
  maxInput = SHOP_CONSTANTS.stock.max;
  minInput = SHOP_CONSTANTS.stock.min;
  stepInput = SHOP_CONSTANTS.stock.step;

  constructor(
    private shopService: ShopService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ShopsListComponent>
  ) {
    this.shopService
      .getShop(shopService.selectedShopSeeProducts)
      .then((shop) => {
        this.shop = shop;
      });

    this.shopService.getShopProducts().then((prodList) => {
      this.isLoading = false;
      if (!!prodList) {
        this.showProducts = prodList;
        if (this.showProducts.length > 0) {
          this.isLoaded = true;
        }
      }
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeStock(product: ProductStock, units: string, id: string) {
    if (!!product && (!!units || units === '0') && !!id) {
      let newStock = Number.parseInt(units);
      return this.shopService.modifyStock(product, newStock, this.shop.id);
    }
    throw Error('Data invalid to change stock');
  }
}
