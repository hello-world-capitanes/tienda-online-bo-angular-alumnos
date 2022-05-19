import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/features/product/models/product-models';
import { ProductService } from 'src/app/features/product/services/product.service';
import { Shop } from '../../models/shop.model';
import { ShopService } from '../../shop.service';
import { ShopsListComponent } from '../shops-list/shops-list.component';

@Component({
  selector: 'app-modify-products-shop',
  templateUrl: './modify-products-shop.component.html',
  styleUrls: ['./modify-products-shop.component.scss'],
})
export class ModifyProductsShopComponent implements OnInit {
  displayedColumns: string[] = ['check', 'id', 'name', 'price'];
  dataSource!: MatTableDataSource<Product>;

  shop!: Shop;
  showProducts!: Product[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

    this.productService.getProducts().then((prodList) => {
      //this.isLoading = false;
      if (!!prodList) {
        this.showProducts = prodList;
        if (this.showProducts.length > 0) {
          //this.isLoaded = true;
          this.dataSource = new MatTableDataSource(this.showProducts);
        }
      }
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
