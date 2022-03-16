import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ShopsCreateComponent } from './shops-create/shops-create.component';
import { ShopsListComponent } from './shops-list/shops-list.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';





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
    ReactiveFormsModule

  ],
  exports:[
    ShopsListComponent,
    ShopsCreateComponent,
  ]
})
export class ShopsModule { }
