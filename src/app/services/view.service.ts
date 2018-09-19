import { Observable } from 'rxjs/Observable';
import { Http, HttpModule  } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { User } from '../models/User.model';
@Injectable()
export class ViewService {
  isLoggedInUser: string;
  isLoggedIn: boolean;
  private _http;
  user:User;
  constructor(private http: HttpClient) {
    this._http = http;
    if(!this.user){
      this.isLoggedIn= true;
      this.user =JSON.parse(localStorage.getItem('user'));
      this.isLoggedInUser=this.user.userName; 
    }else{
      this.isLoggedIn=false;
    }
  }
  getAllTopics(): Observable<any> {
    return this._http.get('http://localhost:8080/api/topic/all').map((res) => res);
  }
  getTopicByName(tname: string): Observable<any>{
    return this._http.get('http://localhost:8080/api/topic/search/tname/'+tname).map((res)=> res);
  }
  getTopicById(id: number): Observable<any>{
    return this._http.get('http://localhost:8080/api/topic/byId/'+id).map((res) => res);
  }
  noOfTopics(): Observable<any>{
    return this._http.get('http://localhost:8080/api/topic/noOfTopics').map((res)=>res);
  }
  getAllTopicsbydesc(): Observable<any> {
    return this._http.get('http://localhost:8080/api/topic/desOrderAll').map((res) => res);
  }
  getUserTopics(id:number):Observable<any>{
    id = this.user.id
    return this._http.post('http://localhost:8080/api/topic/'+id+'/userTopics').map((res)=>res);
  }
}
