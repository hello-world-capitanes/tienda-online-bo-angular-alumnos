import { AuthError } from './../model/authErrors.model';
import { UserAdmin } from 'src/app/core/models/userAdmin';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore, AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarMessageComponent } from './../../../shared/components/snack-bar-message/snack-bar-message.component';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { isAdmin } from '@firebase/util';
import { User } from '../../user/models/user.model';
import { result } from 'cypress/types/lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends FirestoreService{
  protected collection: string;
  private readonly CATEGORY_COLLECTION = 'admin'
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private snackBar: MatSnackBar,
    firestore: AngularFirestore
  ) {
    super(firestore);
    this.collection = this.CATEGORY_COLLECTION;
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
    this.isAdmin(email).then((result) => {
      if(!!result){
        return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
        })
        .catch((error) => {
          this.loginError();
        });
      } else {
        this.loginError();
        return;
      }
    }).catch((error) => {
      this.loginError();
    });


  }

  signUpAdmin(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.createUserAdmin(result.user);
      })
      .catch((error) => {
        this.loginError();
      });
  }

  signUpUser(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.createUser(result.user);
      })
      .catch((error) => {
        this.loginError();
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

  async isAdmin(email: string | null | undefined): Promise<User | undefined> {
    if(!email || email === null || email === ""){
      return undefined;
    }

    const snapshot = await this.getCollection().ref.where("email", "==", email).get();
    return snapshot?.docs && snapshot.docs.length > 0 ? snapshot?.docs[0].data() as User : undefined;
  }

  private loginError(){
    this.snackBar.openFromComponent(SnackBarMessageComponent, {
      data: AuthError.LOGIN_FAIL,
      duration: 1500
    });
    return;
  }
}
