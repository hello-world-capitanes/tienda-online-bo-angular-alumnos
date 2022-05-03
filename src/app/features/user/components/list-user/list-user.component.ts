import { Component } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  panelOpenState = false;

  users:User[] = [
    new User("Raúl","Pradanas Martín","rp@gmail.com","hola"),
    new User("Raúl","Bravo","rb@gmail.com","hola"),
    new User("Fernando","Te queremos","helloworld@gmail.com","hola"),
  ]

  addUser(nuevoUser: User){
    if (!!nuevoUser)
      this.users.push(nuevoUser);
  }

  deleteUser(index:number):void{
    this.users.splice(index,1);
  }

}
