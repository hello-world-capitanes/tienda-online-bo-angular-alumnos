import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopsListComponent } from './shops/shops-list/shops-list.component';

const routes: Routes = [
  { path: 'shops', component: ShopsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
