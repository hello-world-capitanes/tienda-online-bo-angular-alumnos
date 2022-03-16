import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  constructor(public formulario:FormBuilder) { }

  formCrear!:FormGroup;

  ngOnInit(): void {

      this.formCrear=this.formulario.group({

      nameFormControl : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      surnameFormControl : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      emailFormControl : new FormControl('', [Validators.required, Validators.email]),
      passFormControl : new FormControl('', [Validators.required, Validators.minLength(8)]),

    })
  }

  get form(){

    return this.formCrear;

  }

  get errorMessageEmail(): string {
    const form: FormControl = (this.formCrear.get('emailFormControl') as FormControl);
    return form.hasError('required') ?
      'Introduce una correo' :
      form.hasError('email') ?
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
      'Introduce una contraseña' :
      form.hasError('minlength') ?
      'Introduce un nombre de mínimo 3 carácteres':
      form.hasError('maxlength') ?
      'Introduce un nombre de máximo 3 carácteres' :'';
  }

  get errorMessageSurname(): string {
    const form: FormControl = (this.formCrear.get('surnameFormControl') as FormControl);
    return form.hasError('required') ?
      'Introduce una contraseña' :
      form.hasError('minlength') ?
      'Introduce apellidos de mínimo 3 carácteres':
      form.hasError('maxlength') ?
      'Introduce apellidos de máximo 3 carácteres' :'';
  }

  aceptar():void{


    }

  }




