import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CategoriesComponent } from './components/categories/categories.component';
import { ModifyCategoryComponent } from './components/categories/modifyCategory/modify-category/modify-category.component';
import { ProductListCategoryComponent } from './components/product-list-category/product-list-category.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    ModifyCategoryComponent,
    ProductListCategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule,
    MatExpansionModule,
    MatListModule,

  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule {}
