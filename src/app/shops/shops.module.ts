import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ShopsCreateComponent } from './shops-create/shops-create.component';
import { ShopsListComponent } from './shops-list/shops-list.component';



@NgModule({
  declarations: [
    ShopsListComponent,
    ShopsCreateComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
  ],
  exports:[
    ShopsListComponent,
    ShopsCreateComponent
  ]
})
export class ShopsModule { }
