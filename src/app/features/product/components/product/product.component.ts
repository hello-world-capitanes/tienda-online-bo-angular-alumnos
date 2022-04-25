import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product-models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  panelOpenState = false;

  productForm !: FormGroup;

  categories: String[] = [
    "Lacteos", "Panaderia", "Carniceria", "Pescaderia", "Fruteria", "Bebidas", "Limpieza"
  ]

  products: Product[] = [
    new Product("Steinburg", "Pack de 24 latas", 2.48, "Cerveza lagger de calidad suprema", "bebida","",true),
    new Product("Casón histórico", "1L de vino", 0.70, "Vino tinto para calimocho", "bebida","",true),
    new Product("Donuts", "Pack de 6 unidades", 4, "Donuts original glaseados", "comida","",true),
    new Product("Doritos", "Bolsa de 300g", 1.30, "Doritos picantes bolsa grande", "comida","",true),
  ]

  constructor() {
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
    let prod1 = new Product(name, characteristics, price, description, category,"",true);
    this.addProduct(prod1);
  }

  addProduct(prod: Product){
    this.products.push(prod);
  }

  deleteProduct(prodName?: string){
    for(let i = 0; i < this.products.length; i++){
      if(prodName === this.products[i].name){
        this.products.splice(i, 1);
      }
    }
  }

}
