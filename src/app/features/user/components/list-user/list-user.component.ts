import { User } from './../../models/user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent {
  panelOpenState = false;

  users: User[] = [
    new User('Raúl', 'Pradanas Martín', 'rp@gmail.com', 'hola12345'),
    new User('Raúl', 'Bravo', 'rb@gmail.com', 'hola'),
    new User('Fernando', 'Te queremos', 'helloworld@gmail.com', 'hola'),
  ];

  addUser(nuevoUser: User) {
    if (!!nuevoUser) {
      if (this.findByEmail(nuevoUser)) {
        alert('Este usuario ya está dado de alta');
      } else {
        this.users.push(nuevoUser);
      }
    } else {
      alert('Datos introducidos no válidos');
    }
  }

  findByEmail(nUser: User) {
    return this.users.find((user) => {
      if (user.email === nUser.email) {
        return true;
      }
      return false;
    });
  }

  deleteUser(user: User): void {
    this.users.splice(this.users.indexOf(user), 1);
  }
}
