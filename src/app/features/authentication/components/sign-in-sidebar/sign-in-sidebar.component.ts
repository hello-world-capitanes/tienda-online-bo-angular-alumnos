import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-sidebar',
  templateUrl: './sign-in-sidebar.component.html',
  styleUrls: ['./sign-in-sidebar.component.scss']
})
export class SignInSidebarComponent implements OnInit {


  constructor(
    private route: Router,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  signIn(){
    this.route.navigateByUrl("/sign-in");
  }

  signOut(){
    this.authService.signOut();
    this.route.navigateByUrl("/sign-in");
  }

  sesionIniciada(){
    return this.authService.userData ? true : false;
  }
}
