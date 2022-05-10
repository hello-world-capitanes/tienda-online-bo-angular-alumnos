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
import { MatExpansionModule } from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { ProductsListShopComponent } from './components/products-list-shop/products-list-shop.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModifyInfoShopsComponent } from './components/modify-info-shops/modify-info-shops.component';


@NgModule({
  declarations: [
    ShopsListComponent,
    ShopsCreateComponent,
    ShopsModifyComponent,
    ProductsListShopComponent,
    ModifyInfoShopsComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule

  ],
  exports:[
    ShopsListComponent,
    ShopsCreateComponent,
  ]
})
export class ShopsModule { }
