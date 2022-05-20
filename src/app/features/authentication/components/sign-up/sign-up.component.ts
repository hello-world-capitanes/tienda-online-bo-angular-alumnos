import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarMessageComponent } from '../../../../shared/components/snack-bar-message/snack-bar-message.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    public authService: AuthService, private snackBar: MatSnackBar
  ) {
    this.signUpForm = this.initForm();

   }

  ngOnInit(): void {
  }

  initForm(): FormGroup{
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  signUpAdmin(){
    if(this.signUpForm.invalid){
      this.snackBar.openFromComponent(SnackBarMessageComponent, {
        data: "Invalid form",
        duration: 1500
      });
      return;
    }
    this.authService.signUpAdmin(this.getFormValue("email"), this.getFormValue("password")).subscribe(
      res => {

        this.snackBar.openFromComponent(SnackBarMessageComponent, {
        data: "User has been added correctly",
        duration: 1500
      })
    },err => {
      this.snackBar.openFromComponent(SnackBarMessageComponent, {
        data: "Invalid user",
        duration: 1500
      })

    });
  }


  private getFormValue(field: string){
    return this.signUpForm.get(field)?.value;
  }

}
