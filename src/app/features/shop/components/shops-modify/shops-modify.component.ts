import { Shop } from './../../models/shop.model';
import { ShopService } from './../../shop.service';
import { ProductStock } from './../../../product/models/product-stock.model';
import { Product } from './../../../product/models/product-models';
import { Component, OnInit } from '@angular/core';
import { ProductShopFirebase } from 'src/app/features/product/models/product-shop-firebase.model';

@Component({
  selector: 'app-shops-modify',
  templateUrl: './shops-modify.component.html',
  styleUrls: ['./shops-modify.component.scss']
})
export class ShopsModifyComponent implements OnInit {
  private _shop: Shop | undefined;
  products: ProductShopFirebase[] | undefined;
  private newProduct = new Product(
    '4',
    'Doritos',
    'Bolsa de 300g',
    1.3,
    'Doritos picantes bolsa grande',
    [],
    '',
    true
  );

  constructor(private shopService:ShopService) {
    //this._shop = this.shopService.getShop("1234");
    this.products = this._shop?.products;
  }

  ngOnInit(): void {}

 /*  private hasProduct(product: Product): boolean {
    if (this.products != undefined) {
      return this.products?.some((productFind) => {
        productFind.product.id === product.id;
        return true;
      });
    }
    return false;
  } */
  private addProduct(product: ProductShopFirebase) {
    this.products?.push(product);
    //this.shopService.addProduct(product);
  }
}
