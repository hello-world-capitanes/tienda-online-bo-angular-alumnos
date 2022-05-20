export class UserAdmin {
  uid: string;
  email: string;
  creatorId: string;
  creationDate: Date;
  active:boolean;

  constructor(uid: string, email: string, creatorEmail: string, creationDate: Date, active:boolean) {
    this.uid = uid;
    this.email = email;
    this.creatorId = creatorEmail;
    this.creationDate = creationDate;
    this.active = active;
  }



}
