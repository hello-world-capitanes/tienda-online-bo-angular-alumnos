import { AuthGuard } from './../core/guards/auth.guard';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpComponent } from "../features/authentication/components/sign-up/sign-up.component";
import { CategoriesComponent } from "../features/category/components/categories/categories.component";
import { HomePageComponent } from "../features/home/components/home-page/home-page.component";
import { ProductComponent } from "../features/product/components/product/product.component";
import { ShopsListComponent } from "../features/shop/components/shops-list/shops-list.component";
import { UserComponent } from "../features/user/components/user/user.component";


const routes: Routes = [
  { path: 'shops', component: ShopsListComponent},
  { path: 'users', component: UserComponent},
  { path: 'products', component: ProductComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'home', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageContainerRoutingModule { }
