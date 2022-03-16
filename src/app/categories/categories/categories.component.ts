import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories = [{ nombre: "Fruta", estado: true}];

  constructor() { }

  ngOnInit(): void {
  }

}
