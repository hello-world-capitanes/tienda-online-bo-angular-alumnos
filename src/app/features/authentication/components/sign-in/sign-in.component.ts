import { AuthError } from './../../model/authErrors.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarMessageComponent } from 'src/app/shared/components/snack-bar-message/snack-bar-message.component';
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
  constructor( public authService: AuthService, private snackBar: MatSnackBar) {
    this.signInForm = this.initForm();
  }

  ngOnInit(): void {
  }

  logIn(){
    if(this.signInForm.invalid){
      this.snackBar.openFromComponent(SnackBarMessageComponent, {
        data: "Invalid form",
        duration: 1500
      });
      return;
    }
    this.authService.signIn(this.getFormValue("userName"), this.getFormValue("userPassword"));
  }

  initForm(): FormGroup{
    return new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [Validators.required]),
    });
  }

  private getFormValue(field: string){
    return this.signInForm.get(field)?.value;
  }
}
