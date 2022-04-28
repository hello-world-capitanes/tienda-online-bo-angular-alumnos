import { SignUpComponent } from './features/authentication/components/sign-up/sign-up.component';
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
import { ForgotPasswordComponent } from './features/authentication/components/forgot-password/forgot-password.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'shops', component: ShopsListComponent, canActivate: [AuthGuard]},
  { path: 'users', component: FormUserComponent, canActivate: [AuthGuard]},
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard]},
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},

  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
