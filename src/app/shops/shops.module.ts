import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { ShopsCreateComponent } from './shops-create/shops-create.component';



@NgModule({
  declarations: [
    ShopsListComponent,
    ShopsCreateComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ShopsListComponent,
    ShopsCreateComponent
  ]
})
export class ShopsModule { }
