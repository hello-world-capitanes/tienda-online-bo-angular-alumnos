import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { UserComponent } from './components/user/user.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    FormUserComponent,
    ListUserComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule
  ],
  exports: [
    UserComponent
  ],
})
export class UsersModule { }
