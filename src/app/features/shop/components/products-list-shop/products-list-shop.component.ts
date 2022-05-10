import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductShop } from 'src/app/features/product/models/product-shop';
import { ProductStock } from 'src/app/features/product/models/product-stock.model';
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
  productList!: ProductShop[];
  shopProducts: Product[] = [];
  showProducts: ProductStock[] = [];
  isLoaded = false;
  maxInput = SHOP_CONSTANTS.stock.max;
  minInput = SHOP_CONSTANTS.stock.min;
  stepInput = SHOP_CONSTANTS.stock.step;

  constructor(
    private shopService: ShopService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ShopsListComponent>
  ) {
    this.shopService.getShop().then((shop) => {
      this.shop = shop;
    });

    this.shopService.getShopProducts().then((prodList) => {
      this.productList = prodList;
      this.loadProducts();
      this.isLoaded = true;
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeStock(product: ProductStock, units: string) {
    let newStock = Number.parseInt(units);
    return this.shopService.modifyStock(product,newStock);
  }

  loadProducts() {
    this.productList.forEach((prod) => {
      let product = this.productService.findById(prod.id);
      if (product != undefined) {
        this.shopProducts.push(product);
      }
    });

    this.loadVisibleData();
  }

  loadVisibleData() {
    for (let i = 0; i < this.shopProducts.length; i++) {
      this.showProducts.push(new ProductStock(this.shopProducts[i],this.productList[i].stock));
    }
    return this.showProducts;
  }
}
