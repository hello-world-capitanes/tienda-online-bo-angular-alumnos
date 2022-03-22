import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories/categories.component';
import { ProductComponent } from './core/product/product.component';
import { ShopsListComponent } from './shops/shops-list/shops-list.component';
import { FormUserComponent } from './users/form-user/form-user.component';

const routes: Routes = [
  { path: 'shops', component: ShopsListComponent },
  { path: 'users', component: FormUserComponent },
  { path: 'products', component: ProductComponent },
  { path: "categories", component: CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
