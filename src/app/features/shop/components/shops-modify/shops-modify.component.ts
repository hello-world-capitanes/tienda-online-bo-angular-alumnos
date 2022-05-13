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

  private _shop: Shop|undefined;
  products: ProductShopFirebase[]|undefined;

  constructor(private shopService:ShopService) {
    //this._shop = this.shopService.getShop("1234");
    this.products = this._shop?.products;
   }

  ngOnInit(): void {
  }

  increaseStock(addedStock: number,product:Product){
    if(!this.hasProduct(product) || this.products ===undefined){
      this.addProduct({id:product.id, stock:addedStock} as ProductShopFirebase);

    }
    else{
      this.products.find(productFind =>{
        if(productFind.id === product.id){
          productFind.stock += addedStock
          //this.shopService.increaseStockProduct(productFind);
        }
      })
    }

  }
  decreaseStock(addedStock: number,product:Product){
    if(!this.hasProduct(product )|| this.products ===undefined){
      throw new Error("Cannot find specific product in shop.");
    }
    else{
      this.products.find(productFind =>{
        if(productFind.id === product.id){
          productFind.stock -= addedStock;
          //this.shopService.decreaseStockProduct(productFind);
          if(productFind.stock < 0){
            productFind.stock = 0;
          }
        }
      })
    }
  }
  private hasProduct(product:Product):boolean{
    if(this.products !=undefined){
      return this.products?.some(productFind => {
        productFind.id === product.id;
        return true;
      })
    }
    return false;
  }
  private addProduct(product:ProductShopFirebase){
    this.products?.push(product);
    //this.shopService.addProduct(product);
  }

}
