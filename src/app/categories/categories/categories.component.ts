import { Categoria } from './models/categoria.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Categoria[] = [
    new Categoria("Fruta", true, "Descripción", "color"),
    new Categoria("Cereales", true, "Descripción", "color"),
    new Categoria("Verdura", false, "Descripción", "color"),
    new Categoria("Drogería", true, "Descripción", "color"),
  ];

  constructor() { }

  ngOnInit(): void {
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
