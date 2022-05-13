import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/features/category/models/category.model';
import { CategoryService } from 'src/app/features/category/services/category-service.service';
import { Product } from '../../models/product-models';
import { ModifyProductComponent } from '../modify-product/modify-product.component';
import { PRODUCT_ERRORS } from './../../../../core/utils/errors/products.errors';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  panelOpenState = false;

  productForm!: FormGroup;
  products!: Product[];

  categories!: Category[];

  categoriesName!: string[];

  readonly PRODUCT_ERRORS = PRODUCT_ERRORS;
  //TODO --> Buscar expresión regular correcta para url, para imagen de producto
  httpRegex = '/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private matDialog: MatDialog,
  ) {
    this.productService.getAllProducts().subscribe(products => {
      this.products = (!!products && products.length > 0 ? products : [])
    })

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = (!!categories && categories.length > 0 ? categories : [])
    })
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

  ngOnInit(): void {
    this.createForm();
  }

  getCategories(product: Product){
    let refs = [];
    let categories = this.categoryService.getCategories();
    for(let i = 0; i < product.categories.length; i++){

    }
  }

  newProduct() {
    if (!this.productForm.valid) {
      return false;
    } else {
      let id = this.generateId();
      let prod = new Product(
        id,
        this.productForm.value.name,
        this.productForm.value.characteristics,
        this.productForm.value.price,
        this.productForm.value.description,
        this.productForm.value.categories,
        [],
        this.productForm.value.image,
        true
      );
      this.addProduct(prod);
      return true;
    }
  }

  addProduct(product: Product){
    this.productService.addProduct(product);
  }

  deleteProduct(product: Product) {
    if(!!product){
      this.productService.deleteProduct(product);
    }
    throw Error('Product invalid');
  }

  activeProduct(product: Product){
    this.productService.activeProduct(product);
  }

  generateId(): string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substring(2, 9);
  }

  removeCategory(product: Product, category: string){

    this.productService.removeCategory(product,category);
/*     this.products = this.productService.productList; */
  }

  getProducts(){
    return this.products;
  }

  modifyProduct(id: string){
    let product=this.findById(id);
    const dialogRef = this.matDialog.open(ModifyProductComponent, {
      width: '350px',
      data:{
        name:product?.name,
        characteristics:product?.characteristics,
        price:product?.price,
        description:product?.description,
        image:product?.image,
      }
    });
    if(!!product){
      dialogRef.componentInstance.id = id;
      dialogRef.componentInstance.categoriesProd=product?.categories;
      dialogRef.componentInstance.active=product?.active;
    }

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
