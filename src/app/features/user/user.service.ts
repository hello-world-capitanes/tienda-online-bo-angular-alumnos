import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AuthService } from 'src/app/features/authentication/services/auth.service';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends FirestoreService {
  protected collection: string;
  private readonly CATEGORY_COLLECTION = 'users';

  constructor(
    firestore: AngularFirestore,
    private auth: AuthService,
    public snackBar: MatSnackBar,
    public afAuth: AngularFireAuth
  ) {
    super(firestore);
    this.collection = this.CATEGORY_COLLECTION;
  }

  getUsers(): Observable<User[]> {
    return this.getCollection()
      .valueChanges()
      .pipe(map((user) => user as User[]));
  }

  deleteUser(user: User) {
    return this.getCollection().doc(user.id).update({ active: false });
  }
  activeUser(user: User) {
    return this.getCollection().doc(user.id).update({ active: true });
  }

  async createNewUser(formGroupValues: any): Promise<User | undefined> {
    let user = new User(
      this.firestore.createId(),
      formGroupValues.nameFormControl,
      formGroupValues.surnameFormControl,
      formGroupValues.emailFormControl
    );

    return this.getCollection()
      .doc(user.id)
      .set(Object.assign({}, user))
      .then(() => {
        return user as User;
      });
  }
}
