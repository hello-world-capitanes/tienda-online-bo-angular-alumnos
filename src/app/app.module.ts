import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { AuthService } from './features/authentication/services/auth.service';
import { CategoriesModule } from './features/category/category.module';
import { ProductModule } from './features/product/product.module';
import { ShopsModule } from './features/shop/shops.module';
import { UsersModule } from './features/user/users.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    AngularFirestoreModule,
    CoreModule,
    SharedModule,
    UsersModule,
    ShopsModule,
    CategoriesModule,
    ProductModule,
    AuthenticationModule,
    SharedModule,

    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [AuthService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
