import { AuthService } from 'src/app/features/authentication/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  title = 'tienda-online-bo-angular-alumnos';
  userLogged: Boolean = false;
  constructor(public auth:AuthService) { }

  ngOnInit(): void {
      this.userLogged = this.auth.isLoggedIn;
  }

  @ViewChild('drawer') drawer!: MatDrawer;

  onClickMenuButton(): void {
    this.drawer?.toggle();
  }

}
