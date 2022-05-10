import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  id!: string;
  products!: Product[];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ModifyProductComponent>
  ) {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = (!!categories && categories.length > 0 ? categories : [])
    })
    this.productService.getAllProducts().subscribe(products => {
      this.products = (!!products && products.length > 0 ? products : [])
    })
   }

  ngOnInit(): void {
    alert(this.id);
    this.createForm();
  }

  createForm() {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      characteristics: new FormControl('', [Validators.required]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*(.[0-9]+)?|0+.[0-9]*[1-9][0-9]*$'),
      ]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl('', [Validators.required]),
      image: new FormControl('', )
    });
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
