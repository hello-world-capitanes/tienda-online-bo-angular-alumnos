import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/authentication/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './features/authentication/components/forgot-password/forgot-password.component';
import { SignInComponent } from './features/authentication/components/sign-in/sign-in.component';
import { SignUpComponent } from './features/authentication/components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './features/authentication/components/verify-email/verify-email.component';
import { CategoriesComponent } from './features/category/components/categories/categories.component';
import { ProductComponent } from './features/product/components/product/product.component';
import { ShopsListComponent } from './features/shop/components/shops-list/shops-list.component';
import { FormUserComponent } from './features/user/components/form-user/form-user.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
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
