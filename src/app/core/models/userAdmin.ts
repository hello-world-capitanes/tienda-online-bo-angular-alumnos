export class UserAdmin {
  uid: string;
  email: string;
  creatorEmail: string;
  creationDate: Date;

  constructor(uid: string, email: string, creatorEmail: string, creationDate: Date) {
    this.uid = uid;
    this.email = email;
    this.creatorEmail = creatorEmail;
    this.creationDate = creationDate;
  }



}
