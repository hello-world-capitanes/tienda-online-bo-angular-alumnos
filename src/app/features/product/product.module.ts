import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { ProductComponent } from './components/product/product.component';
import {MatChipsModule} from '@angular/material/chips';
import { ModifyProductComponent } from './components/modify-product/modify-product.component';

@NgModule({
  declarations: [
    ProductComponent,
    ModifyProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule

  ],
  exports: [
    ProductComponent,
  ]
})
export class ProductModule { }
