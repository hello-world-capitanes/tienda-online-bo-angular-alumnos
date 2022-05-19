import { PageContainerComponent } from './page-container/component/page-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SignInComponent } from './features/authentication/components/sign-in/sign-in.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./page-container/page-containe-routing.module').then(
  //       (m) => m.PageContainerRoutingModule
  //     ),
  //   //canLoad: [AuthGuard],
  // },
  { path: '', component: PageContainerComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
