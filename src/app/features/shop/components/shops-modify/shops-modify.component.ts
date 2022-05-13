import { Component, OnInit } from '@angular/core';
import { ProductShopFirebase } from 'src/app/features/product/models/product-shop-firebase.model';
import { ProductService } from 'src/app/features/product/services/product.service';
import { Product } from './../../../product/models/product-models';
import { Shop } from './../../models/shop.model';

@Component({
  selector: 'app-shops-modify',
  templateUrl: './shops-modify.component.html',
  styleUrls: ['./shops-modify.component.scss'],
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
    [],
    '',
    true
  );

  constructor(private productService:ProductService) {
    this.products = this._shop?.products;
  }

  ngOnInit(): void {}

  private addProduct(prod: ProductShopFirebase) {
    if(!!prod){
      this.products?.push(prod);
    }
  }
}
