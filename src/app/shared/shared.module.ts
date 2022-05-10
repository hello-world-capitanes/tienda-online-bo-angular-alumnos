import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from './../features/authentication/authentication.module';
import { UsersModule } from './../features/user/users.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SnackBarMessageComponent } from './components/snack-bar-message/snack-bar-message.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SnackBarMessageComponent,
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
