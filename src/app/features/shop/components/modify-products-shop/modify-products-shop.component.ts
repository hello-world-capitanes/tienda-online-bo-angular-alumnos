import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { elementAt } from 'rxjs';
import { Product } from 'src/app/features/product/models/product-models';
import { ProductStock } from 'src/app/features/product/models/product-stock.model';
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
  shopProducts!: ProductStock[];
  finalProducts: string[] = [];

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

    this.shopService.getShopProducts().then((prods) => {
      if (!!prods) {
        this.shopProducts = prods;
        if (this.shopProducts.length > 0) {
          this.shopProducts.map((element) => {
            if (!!element) {
              this.finalProducts.push(element.product.id);
            }
          });
        }
      }
      this.loadProducts();
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

  productInShop(id: string) {
    if (!!id && !!this.shopProducts) {
      return this.shopProducts.find((prods) => {
        if (prods.product.id === id) {
          return true;
        }
        return false;
      });
    }
    return false;
  }

  loadProducts() {
    this.productService.getProducts().then((prodList) => {
      if (!!prodList) {
        let productActive: Product[] = [];
        this.showProducts = prodList;
        this.showProducts.map((element) => {
          if (element.active || this.productInShop(element.id)) {
            productActive.push(element);
          }
        });
        if (productActive.length > 0) {
          this.dataSource = new MatTableDataSource(productActive);
        }
      }
    });
  }

  toggle(id: string) {
    if (!!id) {
      this.finalProducts.map((prod) => {
        if (prod === id) {
          this.finalProducts.splice(this.finalProducts.indexOf(prod), 1);
        } else {
          this.finalProducts.push(id);
        }
      });
    }
  }

  modifyProductsShop(finalProducts: string[], id: string) {
    this.finalProducts.map((prod) => {
      let product!: Product;
      this.productService.findById(prod).then((prod) => {
        if (!!prod) {
          product = prod;
        }
        if (!!product) {
          this.shopService.addProductToShop(product, id);
        }
      });
    });
  }
}
