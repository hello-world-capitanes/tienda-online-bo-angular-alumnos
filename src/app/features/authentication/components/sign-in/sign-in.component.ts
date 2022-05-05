import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor( public authService: AuthService) {
    this.signInForm = this.initForm();
  }

  ngOnInit(): void {
  }

  logIn(){
    if(this.signInForm.invalid){
      //TODO Cambiar log por el snackbar
      console.log("Formulario no válido");
      return;
    }
    this.authService.signIn(this.getFormValue("userName"), this.getFormValue("userPassword"))
  }

  initForm(): FormGroup{
    return new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', [Validators.required]),
    });
  }

  private getFormValue(field: string){
    return this.signInForm.get(field)?.value;
  }
}
