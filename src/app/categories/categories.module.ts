import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CategoriesComponent } from './categories/categories.component';



@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    ReactiveFormsModule,
  ]
})
export class CategoriesModule { }
