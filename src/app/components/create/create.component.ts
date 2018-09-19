import { Http } from '@angular/http';
import { FileUploadServiceService } from './../../services/file-upload-service.service';
import { User } from './../../models/User.model';
import { Topic } from './../../models/Topic.model';
import { CreateService } from './../../services/create.service';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/Forms';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],

})
export class CreateComponent implements OnInit {

  attchment: any;
  options: { toolbarButtons: string[]; };
  isLoggedInUser: string;
  topics: Topic;
  isLoggedIn: boolean;
  inputText = 'text';
  createService;
  uploadedData;
  fileuploadserviceService;
  prodData;
  userId: number;
  topic = {
    'id': '',
    'tName': '',
    'tdescription': '',
    'createdBy': ''
  };
  user = {
    'id': 0,
    'userName': '',
    'email': '',
    'password': '',

  }
  // file upload variable
  filesToUpload: Array<File> = [];

  //counter to check if the attachement is clicked or not;
  counter = 0;
  _http;

  constructor(private createservice: CreateService,
    private fileuploadserviceservice: FileUploadServiceService,
    private http: HttpClient) {
    this._http = http;
    this.createService = createservice;
    this.fileuploadserviceService = fileuploadserviceservice;

    if (this.user) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.isLoggedInUser = this.user.userName;
    } else {
      this.isLoggedIn = false;
    }
  }


  onAddAttachment() {
    this.onPost();
    this.counter = this.counter + 1;
  }

  onPost() {
    if (this.counter == 0) {
      this.prodData = [];
      this.topic.createdBy = this.user.userName;
      console.log(this.topic);
      this.createService.addNewTopicByUserId(this.topic)
        .subscribe((respData) => {
          console.log(respData);
          this.prodData = respData;
        },
          (error) => {
            console.log(error);
          });
    } else {
        let dId = this.prodData.id;
        let data = [];
        const files: Array<File> = this.filesToUpload;
        const fd = new FormData();
        for (var i = 0; i < files.length; i++) {
          fd.append('files', files[i]);
        }
        this.http.post('http://localhost:8080/docuupload/'+dId, fd,{
          reportProgress: true,
          observe:'events'
        }).subscribe((event) => {
          console.log(event);
         if(event.type === HttpEventType.UploadProgress){
           this.uploadedData = Math.round(event.loaded/event.total * 100);
           console.log(this.uploadedData);
          //  console.log(event);
         }

        })
      }
  }
  onFileChange(event) {
    this.filesToUpload = <Array<File>>event.target.files;
    //this.onSubmit();
  }

  ngOnInit() {

    // $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
    // $.FroalaEditor.RegisterCommand('alert', {
    // title: 'Hello',
    // focus: false,
    // undo: false,
    // refreshAfterCallback: false,
    // callback: function () {
    // alert('Hello!');
    // }
    // });
    // this.options={
    // toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert', '|', 'insertLink', 'insertImage', 'specialCharacters', 'color', '|', 'align', 'formatOL', 'formatUL', '|', 'undo', 'redo', 'clearFormatting', 'print'],
    // }
  }

}
