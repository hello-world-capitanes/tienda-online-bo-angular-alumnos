import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  /* @Input("productList") product!= Product; */

  productForm !: FormGroup;
  categorias: String[] = [
    "lacteos", "panaderia", "carniceria", "pescaderia", "fruteria", "bebidas", "limpieza"
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
}
