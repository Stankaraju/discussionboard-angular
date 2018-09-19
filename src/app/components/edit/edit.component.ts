import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { TopicService } from './../../services/topic.service';
import { ViewService } from './../../services/view.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Topic } from '../../models/Topic.model';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  viewService;
  topicService;
  topic:Topic;
  prodData;
  uploadedData;
  _http;
  // file upload variable
  filesToUpload: Array<File> = [];
  // dId = this.topic.id;
  url= 'http://localhost:8080/docuupload/+this.topic.id';
  

  constructor( private router: Router,
               private viewservice: ViewService,
               private topicservice: TopicService,
               private route: ActivatedRoute,
               private http : HttpClient) 
     { 
          this.viewService = viewservice;
          this.topicService = topicservice;
          this._http= http;
        
     }

  addAttachment(){
    let data = [];
    let dId = this.topic.id;
      const files: Array<File> = this.filesToUpload;
      const fd = new FormData();
      for (var i = 0; i < files.length; i++) {
        fd.append('files', files[i]);
      }

      this.http.post('http://localhost:8080/docuupload/'+dId, fd,{
        reportProgress:true,
        observe: 'events'
      }).subscribe((event) => {
        if(event.type === HttpEventType.UploadProgress){ 
        this.uploadedData = Math.round(event.loaded/event.total *100 );
        console.log(event);
        console.log('uploaded: '+ Math.round(event.loaded / event.total * 100)+'%');
        } 
        // this.prodData = res;       
      })
  }
  onFileChange(event) {
    this.filesToUpload = <Array<File>>event.target.files;
    this.addAttachment();
  }
  
     ngOnInit() { 
    // Gets topic by Id to edit 
     let id = this.route.snapshot.paramMap.get('id');
          if(id) this.viewService.getTopicById(id).take(1).subscribe((topic) => {
            console.log(topic);
            this.topic = topic;
          });
  }

  updateTopic(){
    this.topicservice.updateTopic(this.topic).subscribe((respData)=>{
      console.log(respData);
      this.prodData = respData;
    },
  (error)=> {
    console.log(error);
  });
 this.router.navigate(['/view']);
  }
}