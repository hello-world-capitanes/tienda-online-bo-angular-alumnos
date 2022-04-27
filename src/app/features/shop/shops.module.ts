import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ShopsCreateComponent } from './components/shops-create/shops-create.component';
import { ShopsListComponent } from './components/shops-list/shops-list.component';
import { ShopsModifyComponent } from './components/shops-modify/shops-modify.component';

@NgModule({
  declarations: [
    ShopsListComponent,
    ShopsCreateComponent,
    ShopsModifyComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule

  ],
  exports:[
    ShopsListComponent,
    ShopsCreateComponent,
  ]
})
export class ShopsModule { }
