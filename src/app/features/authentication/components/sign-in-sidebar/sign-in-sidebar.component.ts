import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-sidebar',
  templateUrl: './sign-in-sidebar.component.html',
  styleUrls: ['./sign-in-sidebar.component.scss']
})
export class SignInSidebarComponent implements OnInit {
  user = {
    name: "pepe"
  }

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.route.navigateByUrl("/sign-in");
  }

  signOut(){

  }

  sesionIniciada(){
    return true;
  }
}
