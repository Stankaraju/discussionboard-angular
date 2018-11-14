import { User } from './../models/User.model';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component";
@Injectable()
export class AuthService {
  authState: any;
  constructor(public http: Http) { }

  user: User;
  public logIn(user:User){

    return this.http.post('http://localhost:8080/user/login',user)
      .map((response: Response) => {
      let user = response.json();
      //console.log(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    });
  }

  logOut() {
    
    return this.http.post('http://localhost:8080/logout',{})
      .map((response: Response) => {
        console.log(response);
        
      });

  }

 
}