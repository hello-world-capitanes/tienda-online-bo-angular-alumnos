import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarMessageComponent } from './../../../shared/components/snack-bar-message/snack-bar-message.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private snackBar: MatSnackBar
  ) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.router.navigate(['home']);
      } else {
        this.userData = null;
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
      })
      .catch((error) => {
        this.snackBar.openFromComponent(SnackBarMessageComponent, {
          data: "Incorrect login or password",
          duration: 1500
        });
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
      })
      .catch((error) => {
        this.snackBar.openFromComponent(SnackBarMessageComponent, {
          data: "Incorrect login or password",
          duration: 1500
        });
      });
  }



  get isLoggedIn(): boolean {
    return !!this.userData;
  }


  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    console.log("set user data", user);
    return this.afs.collection("admin").doc(user.uid).set(user).then(() => {
      console.log(user);

      return user;
    });
  }

  signOut() {
    this.afAuth.signOut();
    this.router.navigate(['sign-in']);

  }
}
