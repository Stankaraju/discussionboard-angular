import { Topic } from './../models/Topic.model';
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/User.model';

@Injectable()
export class CreateService {
  isLoggedInUser: string;
  isLoggedIn: boolean;
  user: User;
  topic = {
    'id': '',
    'tName': '',
    'tdescription': '',
    'createdBy': ''
  };
  private _http;

  constructor(private http: HttpClient) {
    this._http = http;
    if (!this.user) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.isLoggedInUser = this.user.userName;
    } else {
      this.isLoggedIn = false;
    }
  }
  
  // addNewTopic(post: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this._http.post('http://localhost:8080/api/topic/add', post, headers).map((res) => res);
  // }


  // add a new topic
  addNewTopicByUserId(post: any): Observable<any> {
    let id = this.user.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post('http://localhost:8080/api/topic/add/' + id, post, headers).map((res) => res);
  }

  addTopic():Observable<any>{
    let id = this.user.id;
    
    const headers = new HttpHeaders({'ContentType':'application/json'});
    return this._http.post('http://localhost:8080/api/topic/'+id+'add/topic',headers).map((res)=>res);
  }
}
