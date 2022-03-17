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
    new userBackOffice("Raúl","Bravo","rb@gmail.com","hola"),
    new userBackOffice("Fernando","Te queremos","helloworld@gmail.com","hola"),
  ]

  constructor() { }

  ngOnInit(): void {
    this.users.push(this.nuevoUser);
  }

  addUser(){
    this.users.push(this.nuevoUser);
  }

  deleteUser(index:number):void{
    alert(index);
    this.users.splice(index,1);
  }

}
