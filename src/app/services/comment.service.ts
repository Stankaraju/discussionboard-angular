import { Reply } from './../models/Reply.model';
import { Topic } from './../models/Topic.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { User } from '../models/User.model';
	



@Injectable()
export class CommentService {
  isLoggedInUser: string;
  isLoggedIn: boolean;
  topic = {
    id:0,
    tName: '',
    tdescription: '',
    replies: []
  };
  user: User;
private _http;
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


  addNewReply(id:number, post: any):Observable<Reply> {
    const headers = new HttpHeaders({'ContentType': 'application/json'});
    return this._http.post('http://localhost:8080/api/topic/'+id+'/add/reply',post, headers).map((res)=>res);
  }
  deleteReply(id: number):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post('http://localhost:8080/api/topic/deleteReply/'+id, id, headers).map((res)=> res);
  }
   userComments(commentedby:string):Observable<any>{
  commentedby= this.user.userName;
  const headers = new HttpHeaders({'contentType':'application/json'});
  return this._http.get('http://localhost:8080/api/topic/getUserComments/'+commentedby).map((res)=>res);
}
  updateReply():Observable<any>{
  
  const headers = new HttpHeaders({'contentType':'application/json'});
  return this._http.post('http://localhost:8080/api/topic/updateReply',headers).map((res)=>res);

}
  
}














// getRepliesByTopic(id: number): Observable<any>{
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this._http.post('http://localhost:8080/api/topic/'+id+'/getReplies').map((res)=> res);
  // }
  // getAllReplies():Observable<any>{
  //   return this._http.get('http://localhost:8080/api/topic/allReplies').map((res)=>res);
  // }

  // addNewReply(post: any):Observable<any>{
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this._http.post('http://localhost:8080/api/topic/addReply',post, headers).map((res)=> res);
  // }