import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CategoriesComponent } from './components/categories/categories.component';
import { ModifyCategoryComponent } from './components/categories/modifyCategory/modify-category/modify-category.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    ModifyCategoryComponent
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
    MatChipsModule

  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule {}
