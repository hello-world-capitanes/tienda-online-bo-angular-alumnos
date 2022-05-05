import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export abstract class APIServiceService {

  protected abstract collection: string;

  constructor(private firestore:AngularFirestore) {

  }

  protected getCollection(): AngularFirestoreCollection<any> {
    return this.firestore.collection(this.collection);
  }

  protected getFirestore(): AngularFirestore {
    return this.firestore;
  }
}
