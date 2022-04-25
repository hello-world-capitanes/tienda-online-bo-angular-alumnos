import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product-models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  panelOpenState = false;

  productForm!: FormGroup;
  products!: Product[];

  categories: String[] = [
    'Lacteos',
    'Panaderia',
    'Carniceria',
    'Pescaderia',
    'Fruteria',
    'Bebidas',
    'Limpieza',
  ];

  constructor(private productService: ProductService) {
    this.products = productService.productList;
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
        Validators.pattern("^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$"),
      ]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  newProduct() {
    if (!this.productForm.valid) {
      alert('Campos introducidos no válidos');
      return false;
    } else {
      let id = this.generateId();
      let prod1 = new Product(
        id,
        this.productForm.value.name,
        this.productForm.value.characteristics,
        this.productForm.value.price,
        this.productForm.value.description,
        this.productForm.value.categories,
        '',
        true
      );

      while (this.existId(id)) {
        let prod1 = new Product(
          this.generateId(),
          this.productForm.value.name,
          this.productForm.value.characteristics,
          this.productForm.value.price,
          this.productForm.value.description,
          this.productForm.value.categories,
          '',
          true
        );
      }

      this.addProduct(prod1);
      return true;
    }
  }

  existId(id: string): boolean {
    if (
      this.productService.productList.find((product) => {
        product.id === id;
      })
    ) {
      return true;
    } else {
      return false;
    }
  }

  generateId(): string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  addProduct(prod: Product) {
    this.products.push(prod);
  }

  deleteProduct(prodId: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (prodId === this.products[i].id) {
        this.products.splice(i, 1);
      }
    }
  }
}
