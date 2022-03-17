import { AppComponent } from './app.component';
import { FormUserComponent } from './users/form-user/form-user.component';
import { ProductComponent } from './core/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'users', component: FormUserComponent },
  { path: 'products', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
