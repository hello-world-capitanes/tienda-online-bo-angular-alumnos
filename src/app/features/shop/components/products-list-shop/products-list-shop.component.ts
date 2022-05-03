import { Component, OnInit } from '@angular/core';
import { Shop } from '../../models/shop.model';
import { ShopService } from '../../shop.service';

@Component({
  selector: 'app-products-list-shop',
  templateUrl: './products-list-shop.component.html',
  styleUrls: ['./products-list-shop.component.scss']
})
export class ProductsListShopComponent implements OnInit {
  shops!: Shop[];
  listProducts !: Shop[];

  constructor(
    private shopService: ShopService
  ) {
    this.shops = this.shopService.getAllShops();
    this.listProducts = this.shopService.getProductsList();
  }

  ngOnInit(): void {
    this.shops = this.shopService.getAllShops();
    this.listProducts = this.shopService.getProductsList();
  }

}
