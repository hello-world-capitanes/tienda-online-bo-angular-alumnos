import { Product } from './../../../product/models/product-models';
import { Category } from './../../models/category.model';
import { CategoryService } from 'src/app/features/category/services/category-service.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list-category',
  templateUrl: './product-list-category.component.html',
  styleUrls: ['./product-list-category.component.scss']
})
export class ProductListCategoryComponent implements OnInit {

  category!: Category;
  catProducts!: Product[];
  isLoaded = false;
  isLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ProductListCategoryComponent>
  ) {
    this.category = data.category;
    this.categoryService.findProductByCategory(this.category.id).then((prodList) => {
      this.isLoading = false;
      console.log("prodList: " + prodList)
      if(!!prodList){
        this.catProducts = prodList;
        if(this.catProducts.length > 0){
          this.isLoaded = true;
        }
      }
    })
    console.log("Catproducts en constructor: " + this.catProducts)
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
