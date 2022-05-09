import { SnackBarMessageComponent } from './../../../shared/components/snack-bar-message/snack-bar-message.component';
import { UserAdmin } from './../../../core/models/userAdmin';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.router.navigate(['home']);
      } else {
        this.userData = null;
      }
    });
  }
  // Sign in with email/password
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

  // Sign up with email/password
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        this.snackBar.openFromComponent(SnackBarMessageComponent, {
          data: "Incorrect login or password",
          duration: 1500
        });
      });
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.snackBar.openFromComponent(SnackBarMessageComponent, {
          data: "Password reset email sent, check your inbox.",
          duration: 1500
        });
      })
      .catch((error) => {
        this.snackBar.openFromComponent(SnackBarMessageComponent, {
          data: "Operation fail",
          duration: 1500
        });
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    return !!this.userData;
  }

  // Auth logic to run auth providers
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        this.snackBar.openFromComponent(SnackBarMessageComponent, {
          data: "Operation fail",
          duration: 1500
        });

      });
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: UserAdmin = {
      _uid: user.uid,
      _email: user.email,
      _displayName: user.displayName,
      _photoURL: user.photoURL,
    } as unknown as UserAdmin;

    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  signOut() {
    this.afAuth.signOut();
    this.router.navigate(['sign-in']);

  }
}
