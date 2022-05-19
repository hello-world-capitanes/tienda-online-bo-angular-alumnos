
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

  id!: string;
  categoriesProd!:Category[];
  active!:boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ModifyProductComponent>,
  ) {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = (!!categories && categories.length > 0 ? categories : [])
    })
    this.productService.getAllProducts().subscribe(products => {
      this.products = (!!products && products.length > 0 ? products : [])
    })
   }

  ngOnInit(): void {
    this.createForm();
    this.updateForm();
  }

  createForm() {
    this.productForm = new FormGroup({
      characteristics: new FormControl('', [Validators.required]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^([\+|0-9][0-9]*)(\.?)[0-9|0-9]*$'),
      ]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('',[Validators.pattern('^http(s?):\/{2}(.{1,1000})[^\.]\.(png|jpg|jpeg|svg|gif)$')]),
    });
  }

  updateForm(){
    this.productForm.patchValue({
      characteristics:this.data.characteristics,
      price:this.data.price,
      description:this.data.description,
      image:this.data.image,
    })
  }

  modifyProduct(id: string){
    if(this.productForm.invalid){
      return;
    }

    let newProd = new Product(
      id,
      this.productForm.value.name,
      this.productForm.value.characteristics,
      parseFloat(this.productForm.value.price),
      this.productForm.value.description,
      this.categoriesProd,
      this.productForm.value.image,
      this.active,
    )
    this.productService.modifyProduct(id, newProd);
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }

}
