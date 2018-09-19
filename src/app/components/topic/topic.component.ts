import { Document } from './../../models/document.model';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { CommentService } from './../../services/comment.service';
import { Reply } from './../../models/Reply.model';
import { TopicService } from './../../services/topic.service';
import { Topic } from './../../models/topic.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewService } from './../../services/view.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Response, Http } from '@angular/http';
import { Like } from '../../models/like.model';
import { User } from '../../models/User.model';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  isLoggedInuser: string;
  @Input() currentreply: Reply;
  @Output() newReply: EventEmitter<Reply> = new EventEmitter();
  @Output() updatedReply: EventEmitter<Reply> = new EventEmitter();
  @Input() isEdit: boolean;
  _http;
  isLoggedInUser: string;
  isLoggedIn: boolean;
  isEditReply: boolean;
  isDelete: boolean;
  hide: boolean;
  viewService;
  topicService;
  commentService;
  prodData;
  pData;
  today = Date.now();
  topics: Topic[];
  like: Like[] = [];
  replies: Reply[] = [];
  documents: Document[] = [];
  likedisable: boolean = false;
  resultdata;
  show;

  topic = {
    id: 0,
    tName: '',
    tdescription: '',
    createdBy: '',
    replies: [],
    likes: [],
    documents: []

  };
  document: Document = {
    id: 0,
    name: '',
    type: '',
    content:''
  }
  reply: Reply = {
    id: 0,
    replyText: '',
    commentedBy: ''
  };
  likes: Like = {
    id: 0,
    likes: '',

  };
  currentReply: Reply = {
    id: 0,
    replyText: '',
    commentedBy: ''

  }
  user = {
    id: 0,
    userName: '',
    email: '',
    password: '',
    topics: []
  };



  constructor(private viewservice: ViewService,
    private route: ActivatedRoute,
    private location: Location,
    private topicservice: TopicService,
    private router: Router,
    private commentservice: CommentService,
    private http: Http) {
    this.viewService = viewservice;
    this.topicService = topicservice;
    this.commentService = commentservice;
    this._http = http;

    if (this.user) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.isLoggedInuser = this.user.userName;
    } else {
      this.isLoggedIn = false;
      this.hide = true;
    }
  }
  // For Deleting a topic
  onDelete(topic: Topic) {
    this.topicservice.deleteTopic(this.topic.id).subscribe(() => {
      this.topics.forEach((cur, index) => {
        if (topic.id === cur.id) {
          this.topics.splice(index, 1);
        }
      });
    });
  }
  // For Deleting a reply
  onRemove(reply: Reply) {
    this.commentservice.deleteReply(reply.id).subscribe(() => {
      this.replies.forEach((cur, index) => {
        if (reply.id === cur.id) {
          this.replies.splice(index, 1);
        }
      });
    });
  }

  // For Adding a New Reply
  onReply(reply: Reply) {
    this.reply.commentedBy = this.user.userName
    console.log(this.reply);
    this.commentservice.addNewReply(this.topic.id, this.reply).subscribe((respData) => {
      console.log(respData);
      // this.replies = respData;
      this.newReply.emit(respData);
    },
      (error) => {
        console.log(error);
      });
    this.reply = {
      id: 0,
      replyText: '',
      commentedBy: ''
    };
    // this.router.navigate(['topic/:id']);
    this.ngOnInit();
 }


  // For Editing the topic
  editTopic(topic: Topic) {
    this.isEdit = true;
  }

  // For Editing Reply
  editReply(reply: Reply) {
    this.currentReply = reply;
    this.isEditReply = true;

  }

  // For update reply
  onUpdateReply(reply: Reply) {
    this.replies.forEach((cur, index) => {
      if (reply.id === cur.id) {
        this.replies.splice(index, 1);
        this.replies.unshift(reply);
        this.isEditReply = false;
        this.currentReply = {
          id: 0,
          replyText: '',
          commentedBy: ''
        }
      }
    })

  }
  onNewReply(reply: Reply) {
    this.replies.unshift(reply);
  }

  updateReply() {
    this.reply.commentedBy = this.user.userName;
    this.topicservice.updatedReply(this.reply).subscribe((respData) => {
      this.isEditReply = false;
      this.prodData = respData;
      // this.updatedReply.emit(respData);
    })
  }

  // For Adding a new Like
  onLike() {
    this.prodData = [];
    this.topicservice.addUserLikes(this.topic.id).subscribe((respData) => {
      console.log(respData);
      this.topic.likes.push(respData);
    })
    this.likedisable = true;
  }

 // get documents attached to a topic
  getDocByTopicId() {
    let tId = this.topic.id;
    this.pData = [];
    this.http.get('http://localhost:8080/getdocbytopicId/' + tId).subscribe((res) => {
      this.pData = res;
      this.topic.documents = this.pData;
    })
  }
  checkLike() {
    let uId = this.user.id;
    let tId = this.topic.id;
    if (this.likedisable == false) {
      this.http.get('http://localhost:8080/api/topic/' + uId + '/getuserlike/' + tId).subscribe((res) => {
        // console.log("INSIDE CALL : " +res);
        this.resultdata = res.text();
        // console.log("RESULT DATA" + this.resultdata)
        if(this.resultdata  == ''){
          this.likedisable = false;
        } else {
          this.likedisable = true;
        }
      })
    } else {
      this.likedisable = true;
    }
  }
  // //download documents

  // downloadDoc(){
  //   this.getDocByTopicId;
  //   this.http.get('http://localhost:8080/download-document/'+).subscribe((res)=>{
  //     console.log("download success");
  //   })
  // }

  ngOnInit() {
    // Gets topics by Id
    const id = +this.route.snapshot.paramMap.get('id');
    this.viewservice.getTopicById(id).subscribe((topic) => {
      // console.log(topic);
      this.topic = topic;
      this.checkLike();
    });
    
    // const docId = +this.route.snapshot.paramMap.get('docId');
    // this.topicservice.getimages(docId).subscribe((document)=>{
    //   this.document = document;
    // })

  }

  // sample test for displaying a picture..
  //  image;

  //   getpicture() {
  //   this.http.get('http://localhost:8080/getdocuments/1').subscribe((res) => {
  //     console.log('success');
  //     this.image = res;
  //   });
  //  }
  // url= 'http://localhost:8080/getdocuments/1';
  //  onSelectedFile(event){
  //    if(event.target.files && event.target.files[0]){
  //      var reader = new FileReader();
  //      reader.readAsDataURL(event.target.files[0]);
  //      reader.onload = (event)=> {
  //        this.url = event.target.result;
  //      }
  //    }
  //  }

}
