import { MatSnackBar } from '@angular/material/snack-bar';
import { USER_ERRORS } from './../../../../core/utils/errors/users.errors';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './../../service/user.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { ListUserComponent } from './../list-user/list-user.component';
import { SnackBarMessageComponent } from 'src/app/shared/components/snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements AfterViewInit {

  @ViewChild(ListUserComponent)
  listaUser!: ListUserComponent;
  panelOpenState=false;

  users!: User[];

  formCrear: FormGroup;

  readonly USER_ERRORS = USER_ERRORS;

  constructor(
    private userService: UserService,
    public formulario:FormBuilder,
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar
  ){
    this.formCrear = this.formulario.group({
      name : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      surname : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      //password : new FormControl('', [Validators.required, Validators.minLength(8)]),
    }),
    this.userService.getAllUsers().subscribe(users => {
      this.users = (!!users && users.length > 0 ? users : [])
    })
  }

  ngAfterViewInit(): void {

  }

  addUser(user: User) {
    let result = this.findByEmail(user.email);
    if(result === undefined){
      this.userService.addUser(user);
    }else{
      this.snackBar.openFromComponent(SnackBarMessageComponent, {
        data: 'Unable to create user: the email is already registered',
        duration: 2000
      })
    }
  }


  findByEmail(email: string): User | undefined{
    return this.users?.find((user) => {
      if(user.email === email){
        return user;
      }
      return null;
    })
  }

  newUser(){
    if(!this.formCrear.valid){
      return false;
    }else{
      let id = this.firestore.createId();
      let user = new User(
        id,
        this.formCrear.value.name,
        this.formCrear.value.surname,
        this.formCrear.value.email,
        true
      );
      this.addUser(user);
      return true;
    }
  }

}




