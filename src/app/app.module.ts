import { NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
=======
import { MatDividerModule } from '@angular/material/divider';

import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {MatListModule} from '@angular/material/list';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    SharedModule,

    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    UsersModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
