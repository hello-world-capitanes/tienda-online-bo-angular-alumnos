import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { ListUserComponent } from './../list-user/list-user.component';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements AfterViewInit {

  @ViewChild(ListUserComponent)
  listaUser!: ListUserComponent;
  panelOpenState=false;

  nuevoUser: User = new User("","","","");

  formCrear: FormGroup;

  constructor(public formulario:FormBuilder) {
    this.formCrear = this.formulario.group({
      nameFormControl : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      surnameFormControl : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      emailFormControl : new FormControl('', [Validators.required, Validators.email]),
      passFormControl : new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  ngAfterViewInit(): void {

  }

  addUser() {
    if (!this.formCrear.valid) {
      return;
    }
    else{
      this.nuevoUser = new User(this.formCrear.get("nameFormControl")?.value,
      this.formCrear.get("surnameFormControl")?.value,this.formCrear.get("emailFormControl")?.value,
      this.formCrear.get("passFormControl")?.value);
      this.listaUser?.addUser(this.nuevoUser);
    }

  }


  get errorMessageEmail(): string {
    const form = this.formCrear.get('emailFormControl');
    return form?.hasError('required') ?
      'Introduce una correo' :
      form?.hasError('email') ?
      'Introduce un correo válido':'';
  }

  get errorMessagePass(): string {
    const form: FormControl = (this.formCrear.get('passFormControl') as FormControl);
    return form.hasError('required') ?
      'Introduce una contraseña' :
      form.hasError('minlength') ?
      'Introduce un contraseña de mínimo 8 carácteres':'';
  }

  get errorMessageName(): string {
    const form: FormControl = (this.formCrear.get('nameFormControl') as FormControl);
    return form.hasError('required') ?
      'Introduce un nombre' :
      form.hasError('minlength') ?
      'Introduce un nombre de mínimo 3 carácteres':
      form.hasError('maxlength') ?
      'Introduce un nombre de máximo 3 carácteres' :'';
  }

  get errorMessageSurname(): string {
    const form: FormControl = (this.formCrear.get('surnameFormControl') as FormControl);
    return form.hasError('required') ?
      'Introduce apellidos' :
      form.hasError('minlength') ?
      'Introduce apellidos de mínimo 3 carácteres':
      form.hasError('maxlength') ?
      'Introduce apellidos de máximo 3 carácteres' :'';
  }
}




