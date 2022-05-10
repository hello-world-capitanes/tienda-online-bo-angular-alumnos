import { UserService } from './../../user.service';
import { Subscription } from 'rxjs';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent {
  panelOpenState = false;
  users!: User[];
  subscription: Subscription;

  constructor(private userService: UserService) {
    this.subscription = this.userService
      .getUsers()
      .subscribe((usersFromApi) => {
        this.users =
          !!usersFromApi && usersFromApi.length > 0 ? usersFromApi : [];
      });
  }

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
    this.userService.deleteUser(user);
  }
  activeUser(user: User): void{
    this.userService.activeUser(user);
  }
}
