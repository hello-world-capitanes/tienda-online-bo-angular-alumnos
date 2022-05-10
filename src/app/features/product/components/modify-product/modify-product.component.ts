
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { PRODUCT_ERRORS } from 'src/app/core/utils/errors/products.errors';
import { Category } from 'src/app/features/category/models/category.model';
import { CategoryService } from 'src/app/features/category/services/category-service.service';
import { Product } from '../../models/product-models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {

  productForm!: FormGroup;

  readonly PRODUCT_ERRORS = PRODUCT_ERRORS;

  categories!: Category[];
  products!: Product[];

  product!: Product | undefined;

  id!: string;

  constructor(
    private form: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ModifyProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = (!!categories && categories.length > 0 ? categories : [])
    })
    this.productService.getAllProducts().subscribe(products => {
      this.products = (!!products && products.length > 0 ? products : [])
    })
    this.productForm = this.form.group({
      name: new FormControl
        (data.name,
          [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)]
        ),
      characteristics: new FormControl
        (data.characteristics,
          [Validators.required]
        ),
      price: new FormControl
        (data.price,
          [Validators.required,
          Validators.pattern('^[1-9][0-9]*(.[0-9]+)?|0+.[0-9]*[1-9][0-9]*$'),]
        ),
      description: new FormControl
        (data.description,
          [Validators.required]
        ),
      categories: new FormControl
        (data.categories,
          [Validators.required]
        ),
      image: new FormControl
        (data.image),
      active: new FormControl
        (data.active)
    })
   }

  ngOnInit(): void {

  }

  modifyProduct(id: string){
    let newProd = new Product(
      id,
      this.productForm.value.name,
      this.productForm.value.characteristics,
      this.productForm.value.price,
      this.productForm.value.description,
      this.productForm.value.categories.id,
      this.productForm.value.image,
      true
    )
    this.productService.modifyProduct(id, newProd);
    this.dialogRef.close();
  }


  findById(id: string): Product | undefined{
    return this.products?.find((prod) => {
      if(prod.id === id){
        return prod;
      }
      return null;
    })
  }

}
