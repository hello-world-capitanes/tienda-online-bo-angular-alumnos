import { Component, Input, OnInit } from '@angular/core';
import { userBackOffice } from './modals/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  @Input() nuevoUser!: userBackOffice;

  users:userBackOffice[] = [
    new userBackOffice("Raúl","Pradanas Martín","rp@gmail.com","hola"),
    new userBackOffice("Raúl","Pradanas Martín","rp@gmail.com","hola"),
    new userBackOffice("Raúl","Pradanas Martín","rp@gmail.com","hola"),
  ]

  constructor() { }

  ngOnInit(): void {
    this.users.push(this.nuevoUser);
  }

}
