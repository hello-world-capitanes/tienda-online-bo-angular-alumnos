import { Component, Input } from '@angular/core';
import { userBackOffice } from './modals/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

  users:userBackOffice[] = [
    new userBackOffice("Raúl","Pradanas Martín","rp@gmail.com","hola"),
    new userBackOffice("Raúl","Bravo","rb@gmail.com","hola"),
    new userBackOffice("Fernando","Te queremos","helloworld@gmail.com","hola"),
  ]

  addUser(nuevoUser: userBackOffice){
    if (!!nuevoUser)
      this.users.push(nuevoUser);
  }

  deleteUser(index:number):void{
    this.users.splice(index,1);
  }

}
