import { UserAdmin } from 'src/app/core/models/userAdmin';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore, AngularFirestoreDocument
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

  signUpAdmin(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.createUserAdmin(result.user);
      })
      .catch((error) => {
        this.snackBar.openFromComponent(SnackBarMessageComponent, {
          data: "Incorrect login or password",
          duration: 1500
        });
      });
  }

  signUpUser(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.createUser(result.user);
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



  createUserAdmin(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `admin/${user.uid}`
    );
    const userData : UserAdmin = {
      uid: user.uid,
      email: user.email,
      creatorEmail : this.userData.email,
      creationDate : new Date
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  createUser(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData : UserAdmin = {
      uid: user.uid,
      email: user.email,
      creatorEmail : this.userData.email,
      creationDate : new Date
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut() {
    this.afAuth.signOut();
    this.router.navigate(['sign-in']);

  }
}
