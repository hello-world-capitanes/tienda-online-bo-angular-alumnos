import { UserAdmin } from 'src/app/core/models/userAdmin';
import { ApiService } from './../../../core/services/api.service';
import { ApiUserAdmin } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends ApiService{

  protected readonly AUTH_URL = "auth";
  constructor(private http: HttpClient,) {
    super();
   }

  signUp(email:string, password:string, adminId:string):Observable<UserAdmin>{
    let newUser = {"user":{
      "email":email,
      "password":password
      },
      "adminCreatorId": adminId
    }
    return this.http.post(`${this.API_URL}/${this.AUTH_URL}`, newUser).pipe(map((res) => {
      const apiUser = res as ApiUserAdmin;
      return  new UserAdmin(apiUser.uid, email, adminId, apiUser.creationDate,true);
    }));
  }

}
