import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.model';

@Injectable()
export class UserService {
  private _http;
  constructor(public http: Http) {
    this._http = http;
   }
  createAccount(user: User){
    return this._http.post('http://localhost:8080/user/register',user).map((res)=> res.json());
  }
  userLogin(user: User){
    return this._http.post('http://localhost:8080/user/login',user).map((res)=>res.json());
  }
}
