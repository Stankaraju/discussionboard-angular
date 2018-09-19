import { trigger, transition, style, animate } from '@angular/animations';
import { CommentService } from './../../services/comment.service';
import { User } from './../../models/User.model';
import { ViewService } from './../../services/view.service';
import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { FormGroup } from '@angular/Forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Topic } from '../../models/Topic.model';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  // animations: [
  //   trigger( 'fade', [
  //     transition (':enter', [style ({opacity: 0}),
  //     animate(2000) ])
  //   ] ),
  //   trigger('slide',[
  //     transition(':leave',[
  //    animate('0.5s ease-in ', style({transform:'translateX(100%)'}))
  //  ]) 
  //   ])
  
  // ]
})
export class ViewComponent implements OnInit {
  form: any;
  rows: any;
  pageSize: any;
  isLoggedInUser: string;
  isLoggedIn: boolean;
  viewService;
  commentService;
  searchDate;
  createdBy;
  total;
  searchText;
  topic: Topic;
  today = Date.now();
  user: User; 
  p;
  prodData:any[]=[];


  constructor(private viewservice: ViewService,
              private route: ActivatedRoute,
              private router: Router,
              private commentservice:CommentService) {
    this.viewService = viewservice;
    this.commentService = commentservice;
    this.viewService.getAllTopicsbydesc().subscribe((respData) =>
  {
    console.log(respData);
    this.prodData = respData;
 
  });
  this.user =JSON.parse(localStorage.getItem('user')); 
 
  }

  searchBycomments(){
  this.commentService.userComments().subscribe((respData)=>{
    console.log(respData);
    this.prodData=respData;
    
  })
  }

 getUserTopic(){
   this.viewService.getUserTopics().subscribe((respData)=>{
     console.log(respData);
     this.prodData=respData;
   })
 }

  ngOnInit() {
   if(this.user){
    this.isLoggedIn= true;
    this.user =JSON.parse(localStorage.getItem('user'));
    this.isLoggedInUser=this.user.userName;
  }else{
    this.isLoggedIn=false;
  } 

  }

  checked;
  check;
    filters(){
      if(this.checked){
        this.getUserTopic();
      }else if(this.check){
        this.searchBycomments();
      }else if(this.checked && this.check){
        this.getUserTopic();
        this.searchBycomments();
      }
   
  }
  bothFilters(){
    if(this.checked && this.check){
      this.getUserTopic();
      this.searchBycomments();
    }

  }

  onClear(){
    this.form.reset();
  }
}
