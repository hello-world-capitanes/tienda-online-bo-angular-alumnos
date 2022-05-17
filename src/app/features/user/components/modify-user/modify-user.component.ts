import { USER_ERRORS } from './../../../../core/utils/errors/users.errors';
import { User } from './../../models/user.model';
import { UserService } from './../../service/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss']
})
export class ModifyUserComponent implements OnInit {

  id!: string;

  user!: User;

  modifyUserForm!: FormGroup;

  readonly USER_ERRORS = USER_ERRORS;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private userService: UserService,
    public dialogRef: MatDialogRef<ModifyUserComponent>
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  close(){
    this.dialogRef.close();
  }

  createForm(){
    this.modifyUserForm = new FormGroup({
      name: new FormControl
        (this.data.name,
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]
        ),
      surname: new FormControl
        (this.data.surname,
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]
        ),
      email: new FormControl
        (this.data.email,
        [Validators.required,
        Validators.email])
    })
  }

  modifyUser(id: string){
    if(this.modifyUserForm.invalid){
      return;
    }
    let newUser = new User(
      id,
      this.modifyUserForm.value.name,
      this.modifyUserForm.value.surname,
      this.modifyUserForm.value.email,
      this.data.active
    )
    newUser.active = this.data.active;
    this.userService.modifyUser(id, newUser);
    this.close();
  }

}
