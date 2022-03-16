import { Categoria } from './models/categoria.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Categoria[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
