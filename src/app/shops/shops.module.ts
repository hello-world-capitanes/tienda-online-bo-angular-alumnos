import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ShopsCreateComponent } from './shops-create/shops-create.component';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { MatTableModule } from '@angular/material/table';





@NgModule({
  declarations: [
    ShopsListComponent,
    ShopsCreateComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
  ],
  exports:[
    ShopsListComponent,
    ShopsCreateComponent,
  ]
})
export class ShopsModule { }
