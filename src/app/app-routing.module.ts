import { ShopsModifyComponent } from './features/shop/components/shops-modify/shops-modify.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './features/category/components/categories/categories.component';
import { HomePageComponent } from './features/home/components/home-page/home-page.component';
import { ProductComponent } from './features/product/components/product/product.component';
import { ShopsListComponent } from './features/shop/components/shops-list/shops-list.component';
import { FormUserComponent } from './features/user/components/form-user/form-user.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'shops', component: ShopsListComponent },
  { path: 'users', component: FormUserComponent },
  { path: 'products', component: ProductComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'shop', component: ShopsModifyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
