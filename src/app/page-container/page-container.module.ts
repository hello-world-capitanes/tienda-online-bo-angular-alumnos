import { AppRoutingModule } from './../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PageContainerComponent } from './component/page-container.component';



@NgModule({
  declarations: [
    PageContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    MatDividerModule,
    MatSidenavModule
  ],
  exports: [
    PageContainerComponent,
  ]
})
export class PageContainerModule { }
