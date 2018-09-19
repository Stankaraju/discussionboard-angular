import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '../models/Topic.model';
import { ResponseType } from '@angular/http';
import { User } from '../models/User.model';
import { Reply } from '../models/Reply.model';

@Injectable()
export class TopicService {
  private _http;
  isLoggedInUser: string;
  isLoggedIn: boolean;
  user:User;
  topic = {
    'id': '',
    'tName': '',
    'tdescription': '',
    'createdBy':''
  };
  disable:boolean = false;


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


   // to delete a topic..
   deleteTopic(id:number):Observable<any>{
     return this._http.post('http://localhost:8080/api/topic/delete/'+id).map((res) => res);
   }

   // to update a topic
   updateTopic(topic: Topic): Observable<Topic> {
    console.log(topic);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this._http.put('http://localhost:8080/api/topic/update',topic, headers );
   }

   //update a reply
   updatedReply(reply:Reply):Observable<Reply>{
     console.log(reply);
     const headers = new HttpHeaders({'Content-Type':'application/json'});
     return this._http.put('http://localhost:8080/api/topic/updateReply',reply,headers);
   }

   // To add a new like to a topic..
   addNewLike(id:number, post:any): Observable<any>{
    const headers = new HttpHeaders({'ContentType': 'application/json'})
   
     return this._http.post('http://localhost:8080/api/topic/'+id+'/add/like',post, headers).map((res)=> res);
   }
   // To get likes by Topics..
   getLikesByTopic(id:number, post:any): Observable<any>{
    const headers = new HttpHeaders({'ContentType': 'application/json'})
     return this._http.post('http://localhost:8080/api/topic/'+id+'/getLikes',post, headers).map((res)=> res);
   }

   // To get All topics created by a particular user
   getAllTopicsByUser(id: number): Observable<any>{
    const headers = new HttpHeaders({'ContentType': 'application/json'})
    return this._http.post('http://localhost:8080/api/topic/'+id+'/getTopics',headers).map((res) => res);
  }
  // To get users by username..
  getByUserName(userName: string): Observable<any>{
    const headers = new HttpHeaders({'ContentType':'application/json'})
    return this._http.get('http://localhost:8080/api/topic/search/userName/'+userName, headers).map((res)=> res);
  }


// add likes by users
  addUserLikes(id:number):Observable<any>{
    let uid = this.user.id;
    const headers = new HttpHeaders({'ContentType':'application/json'})
    return this._http.post('http://localhost:8080/api/topic/'+uid+'/addLike/'+id).map((res)=>res);
  }

//  // delete a like 
//    deleteLikeByUser():Observable<any>{
//      let uId = this.user.id;
//     const headers = new HttpHeaders({'ContentType':'application/json'})
//     return this._http.post('http://localhost:8080/api/topic/'+uId+'/deletelike/'+3).map((res)=>res);
//    }
   

  // get documents 

   getimages(docId:number):Observable<any>{
   return  this.http.get('http://localhost:8080/getdocuments/'+docId).map((res)=>res);
   }
}
