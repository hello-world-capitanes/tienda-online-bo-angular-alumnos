import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ProductComponent } from './product/product.component';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatSelectModule,
    MatIconModule
  ],
  exports: [
    ProductComponent,
  ]
})
export class CoreModule { }
