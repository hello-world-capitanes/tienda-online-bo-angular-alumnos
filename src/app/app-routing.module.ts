import { AppComponent } from './app.component';
import { FormUserComponent } from './users/form-user/form-user.component';
import { ProductComponent } from './core/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsListComponent } from './shops/shops-list/shops-list.component';

const routes: Routes = [
  { path: 'Shops', component: ShopsListComponent},
  { path: 'users', component: FormUserComponent },
  { path: 'products', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
