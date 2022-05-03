import { ShopsModifyComponent } from './features/shop/components/shops-modify/shops-modify.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/authentication/components/dashboard/dashboard.component';
import { SignInComponent } from './features/authentication/components/sign-in/sign-in.component';
import { VerifyEmailComponent } from './features/authentication/components/verify-email/verify-email.component';
import { CategoriesComponent } from './features/category/components/categories/categories.component';
import { HomePageComponent } from './features/home/components/home-page/home-page.component';
import { ProductComponent } from './features/product/components/product/product.component';
import { ShopsListComponent } from './features/shop/components/shops-list/shops-list.component';
import { FormUserComponent } from './features/user/components/form-user/form-user.component';

const routes: Routes = [
  { path: '', component: FormUserComponent },
  { path: 'shops', component: ShopsListComponent },
  { path: 'users', component: FormUserComponent },
  { path: 'products', component: ProductComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'shop', component: ShopsModifyComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
