import { ModifyUserComponent } from './../modify-user/modify-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../service/user.service';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { identity } from 'cypress/types/lodash';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent {
  panelOpenState = false;

  users!: User[];

  constructor(
    private userService: UserService,
    private matDialog: MatDialog
  ){
    this.userService.getAllUsers().subscribe(users => {
      this.users = (!!users && users.length > 0 ? users : [])
    })
  }

  deleteUser(user: User){
    this.userService.deleteUser(user)
  }

  activateUser(user: User){
    this.userService.activateUser(user)
  }

  modifyUser(user: User){
    const dialogRef = this.matDialog.open(ModifyUserComponent, {
      width: '350px',
      data: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        active: user.active,
      }
    })
  }
}
