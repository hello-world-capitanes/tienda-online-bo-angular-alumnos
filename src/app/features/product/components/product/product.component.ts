import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product-models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  panelOpenState = false;

  productForm !: FormGroup;
  products: Product[];

  categories: String[] = [
    "Lacteos", "Panaderia", "Carniceria", "Pescaderia", "Fruteria", "Bebidas", "Limpieza"
  ]


  constructor(private productService: ProductService) {
    this.products = productService.productList;
  }

  createForm(){
    this.productForm = new FormGroup({
      id: new FormControl('',),
      name: new FormControl('',[
        Validators.required,
      ]),
      characteristics: new FormControl('',[
        Validators.required,
      ]),
      price: new FormControl('',[
        Validators.required,
      ]),
      description: new FormControl('',[
        Validators.required,
      ]),
      categories: new FormControl('',[
        Validators.required,
      ])
    })
  }

  ngOnInit(): void {
    this.createForm();
  }

  newProduct() {
    let name = this.productForm.value.name;
    let characteristics = this.productForm.value.characteristics;
    let price = this.productForm.value.price;
    let description = this.productForm.value.description;
    let category = this.productForm.value.categories;
    let prod1 = new Product(name, characteristics, price, description, category);
    this.addProduct(prod1);
  }

  addProduct(product: Product){
    this.productService.addProduct(product);
  }

  deleteProduct(product: Product){
    this.productService.deleteProduct(product);
  }

}
