import { UsersModule } from './../features/user/users.module';
import { AuthenticationModule } from './../features/authentication/authentication.module';
import { SignInComponent } from './../features/authentication/components/sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';

import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    UsersModule,

    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    AuthenticationModule,
    MatSidenavModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    HomeComponent
  ]
})
export class SharedModule { }
