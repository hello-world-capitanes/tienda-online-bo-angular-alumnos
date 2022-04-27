import { Shop } from './../../models/shop.model';
import { ShopService } from './../../shop.service';
import { ProductStock } from './../../../product/models/product-stock.model';
import { Product } from './../../../product/models/product-models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shops-modify',
  templateUrl: './shops-modify.component.html',
  styleUrls: ['./shops-modify.component.scss']
})
export class ShopsModifyComponent implements OnInit {

  private _shop: Shop|undefined;
  private _products: ProductStock[]|undefined;
  private newProduct = new Product(
    '4',
    'Doritos',
    'Bolsa de 300g',
    1.3,
    'Doritos picantes bolsa grande',
    'comida',
    '',
    true
  )

  constructor(private shopService:ShopService) {
    this._shop = this.shopService.getShop("1234");
    this._products = this._shop?.products;
   }

  ngOnInit(): void {
    this.increaseStock(5,this.newProduct);
  }

  increaseStock(addedStock: number,product:Product){
    if(!this.hasProduct(product) || this._products ===undefined){
      this.addProduct(new ProductStock(product,addedStock));

    }
    else{
      this._products.find(productFind =>{
        if(productFind.product.id === product.id){
          productFind.stock += addedStock
          this.shopService.increaseStockProduct(productFind);
        }
      })
    }

  }
  decreaseStock(addedStock: number,product:Product){
    if(!this.hasProduct(product )|| this._products ===undefined){
      throw new Error("Cannot find specific product in shop.");
    }
    else{
      this._products.find(productFind =>{
        if(productFind.product.id === product.id){
          productFind.stock -= addedStock;
          if(productFind.stock < 0){
            productFind.stock = 0;
          }
        }
      })
    }
  }
  private hasProduct(product:Product):boolean{
    if(this._products !=undefined){
      return this._products?.some(productFind => {
        productFind.product.id === product.id;
        return true;
      })
    }
    return false;
  }
  private addProduct(product:ProductStock){
    this.products?.push(product);
    this.shopService.addProduct(product);
  }

  get products():ProductStock[]|undefined{
    return this._products;
  }
}
