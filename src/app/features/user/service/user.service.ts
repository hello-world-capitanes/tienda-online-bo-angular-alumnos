import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './../models/user.model';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirestoreService {

  protected collection!: string;
  private _userList!: User[];

  private readonly USERS_COLLECTION = 'users';

  constructor(firestore: AngularFirestore) {
    super(firestore);
    this.collection = this.USERS_COLLECTION;
    this.getUsers().then (users => {
      this._userList = users;
    })
  }

  async getUsers(): Promise<User[]>{
    let users: User[] = [];
    const snapshot = await this.getCollection().ref.get();
    snapshot.docs.forEach(user => {
      users.push(user.data() as User);
    })
    return users;
  }

  getAllUsers(): Observable<User[]>{
    return this.getCollection().valueChanges().pipe(map(user=>user as User[]))
  }

  async userExists(user: User): Promise<User | undefined>{
    const snapshot = await this.getCollection().ref.where('id', '==', user.id).get();
    return snapshot?.docs && snapshot.docs.length > 0 ? snapshot?.docs[0].data() as User : undefined;
  }

  async deleteUser(user: User): Promise<any>{
    const result = await this.userExists(user);
    if(result !== undefined){
      const user_1 = await this.getCollection().doc(user.id).update({ active: false })
      return user_1;
    }else{
      return null;
    }
  }

  async activateUser(user: User): Promise<any>{
    const result = await this.userExists(user);
    if(result !== undefined){
      const user_1 = await this.getCollection().doc(user.id).update({ active: true })
      return user_1;
    }else{
      return null;
    }
  }

  async modifyUser(id: string, newUser: User): Promise<any>{
    let userDb = {
      id: id,
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      active: newUser.active
    }
    return this.getCollection().doc(id).update({'name': userDb.name, 'surname': userDb.surname, 'email': userDb.email})
  }

  async addUser(user: User): Promise<User>{
    if(!user){
      throw new Error('User not provided')
    }
    const result = await this.userExists(user)

    if(result === undefined){
      let userDB = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        active: user.active
      }
      console.log("id" + userDB.id + " | name: " + userDB.name + " | surname: " + userDB.surname + " | email: " + userDB.email + " | active: " + userDB.active)
      return this.getCollection().doc(user.id).set(Object.assign({}, userDB)).then(() => user)
    }else{
      throw new Error();
    }
  }

}
