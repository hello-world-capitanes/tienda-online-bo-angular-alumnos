import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories/categories.component';
const routes: Routes = [
  // { path: "",
  //   component: AppComponent,
  //   children: [
  //     {
  //       path: 'categories', // child route path
  //       component: CategoriesComponent, // child route component that the router renders
  //     }
  //   ],
  // },
  { path: "categories", component: CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
