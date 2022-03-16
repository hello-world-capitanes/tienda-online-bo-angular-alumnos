import { Categoria } from './models/categoria.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Categoria[] = [];
  categoryForm !: FormGroup;

  constructor(private formulario: FormBuilder) { }

  ngOnInit(): void {

    this.categoryForm = this.formulario.group({

      name: new FormControl('', [Validators.required]),

      descripcion: new FormControl('', [Validators.required]),

      color: new FormControl('', [Validators.required])
    })
  }

  addLista(){

    /* this.categories.push(new Categoria(
          this.categoryForm.get("name")?.value,)); */

  }

}
