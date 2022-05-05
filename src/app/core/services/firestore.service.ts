import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export abstract class FirestoreService {

  protected abstract collection: string;

  constructor(protected firestore:AngularFirestore) {

  }

  protected getCollection():AngularFirestoreCollection{
    return this.firestore.collection(this.collection);
  }

  protected getFirestore():AngularFirestore{
    return this.firestore;
  }

}
