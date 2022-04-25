import { ProductStock } from './../../../product/models/product-stock.model';
import { Product } from './../../../product/models/product-models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shops-modify',
  templateUrl: './shops-modify.component.html',
  styleUrls: ['./shops-modify.component.scss']
})
export class ShopsModifyComponent implements OnInit {

  _products:ProductStock[];
  constructor() {
    this._products = [];
   }

  ngOnInit(): void {
  }

  increaseStock(addedStock: number,product:Product){
    if(!this.hasProduct(product)){
      this.addProduct(new ProductStock(product,addedStock));
    }
    else{
      this.products.find(productFind =>{
        productFind.product.id === product.id;
        productFind.stock += addedStock;
      })
    }
  }
  decreaseStock(addedStock: number){
    return;
  }
  private hasProduct(product:Product):boolean{
    return this.products.some(productFind => {
      productFind.product.id === product.id;
    })
  }
  private addProduct(product:ProductStock){
    this.products.push(product);
  }
  get products():ProductStock[]{
    return this._products;
  }


}
