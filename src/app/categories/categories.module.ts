import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatIconModule,
  ]
})
export class CategoriesModule { }
