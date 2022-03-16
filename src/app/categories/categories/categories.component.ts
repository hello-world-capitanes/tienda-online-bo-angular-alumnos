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

/*   categories: Categoria[] = [
    new Categoria("Fruta", true, "Descripción", "color"),
    new Categoria("Cereales", true, "Descripción", "color"),
    new Categoria("Verdura", false, "Descripción", "color"),
    new Categoria("Drogería", true, "Descripción", "color"),
  ]; */

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

  remove(categoriaRef: Categoria)
  {
    this.categories.forEach(categorie => {
      if(categorie === categoriaRef)
      {
        categorie.cambiarEstado();
      }
    });
  }
}
